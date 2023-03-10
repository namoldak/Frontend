// 외부모듈
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { useCookies, Cookies } from 'react-cookie';
import * as StompJs from '@stomp/stompjs';

// assets - 이미지, 효과음
import voiceOn from 'assets/images/voiceOn.svg';
import voiceOff from 'assets/images/voiceOff.svg';
import cameraOff from 'assets/images/cameraOff.svg';
import cameraOn from 'assets/images/cameraOn.svg';
import backBtn from 'assets/images/backBtn.svg';
import gameStartBtn from 'assets/images/startBtn.svg';
import categoryImg from 'assets/images/category.svg';
import star from 'assets/images/star.svg';
import keywordImg from 'assets/images/keyword.svg';
import userCardImg from 'assets/images/userCardImg.svg';
import playerImg from 'assets/images/playerImg.svg';
import endSound from 'assets/audio/endSound.mp3';
import startSound from 'assets/audio/startSound.mp3';

// 내부모듈
import { instance } from 'api/core/axios';
import useToast from 'hooks/useToast';
import usePreventGoBack from 'hooks/usePreventGoBack';
import usePreventRefresh from 'hooks/usePreventRefesh';
import useEffectSound from 'hooks/useEffectSound';
import {
  setRefreshToken,
  getRefreshToken,
  getNicknameCookie,
} from 'utils/cookies';
import GameModal from 'components/common/Modals/InGameModal/GameModal';
import GameAnswerModal from 'components/common/Modals/InGameModal/GameAnswerModal';
import ToastMessage from 'components/common/Toast/ToastMessage';
import Timer from './Timer/Timer';
import SpotTimer from './Timer/SpotTimer';
import Audio from './UserCardsAndChatBox/Audio';
import ChatBox from './UserCardsAndChatBox/ChatBox';

// let 전역변수
let stream = null;
let pcs = {};
let myPeerConnection;
let viewKeyWord = '';

function GameRoomRTC() {
  const SockJs = new SockJS(`${process.env.REACT_APP_WEBSOKET_URL}`);

  const dispatch = useDispatch();
  const myNickName = getNicknameCookie('nickname');
  const navigate = useNavigate();
  const owner = sessionStorage.getItem('owner');
  const param = useParams();
  const { roomId } = param;
  const [cookie] = useCookies();

  const socketRef = useRef();
  const userCardImgRef = useRef(null);
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const startBtn = useRef(null);
  const leaveBtn = useRef(null);
  const client = useRef({});

  const [isStartModal, setIsStartModal] = useState(false);
  const [isSpotTimer, setIsSpotTimer] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [isMyTurnModal, setIsMyTurnModal] = useState(false);
  const [isEndGameModal, setIsEndGameModal] = useState(false);
  const [isWrongAnswerModal, setIsWrongAnswerModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState('');
  const [notice, setNotice] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [myKeyword, setMyKeyword] = useState('');
  const startEffect = useEffectSound(startSound, 1);
  const endEffect = useEffectSound(endSound, 1);

  const connectHeaders = {
    Authorization: cookie.access_token,
  };

  // stomp client section
  const subscribe = async () => {
    client.current.subscribe(`/sub/gameRoom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      switch (data.type) {
        case 'ENTER': {
          break;
        }
        case 'CHAT': {
          setChatMessages((chatMessages) => [...chatMessages, data]);
          break;
        }
        case 'START': {
          startEffect.play();
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = false;
            });
          } catch (erorr) {
            // console.log(error)
          }
          setIsStartModal(true);
          setCategory(data.content.category);
          setKeyword(data.content.keyword);
          setMyKeyword('???');
          viewKeyWord = data.content.keyword[`${myNickName}`];
          if (myNickName === sessionStorage.getItem('owner')) {
            startBtn.current.style.visibility = 'hidden';
            leaveBtn.current.disabled = true;
            sendChat({ message: data.content.startAlert, sender: data.sender });
          } else {
            leaveBtn.current.disabled = true;
          }
          break;
        }
        case 'SPOTLIGHT': {
          setNotice(data.content);
          if (myNickName === data.sender) {
            setIsMyTurn(true);
            muteBtn.current.style.display = 'block';
            setIsVoiceOn(true);
            setIsSpotTimer(true);
            setUsers((users) =>
              users.map((user) =>
                user.nickName === data.sender
                  ? { ...user, isMyTurn: true }
                  : { ...user, isMyTurn: false },
              ),
            );
            try {
              stream.getAudioTracks().forEach((track) => {
                track.enabled = true;
              });
            } catch (e) {
              // console.log(e);
            }
          } else {
            try {
              stream.getAudioTracks().forEach((track) => {
                track.enabled = false;
              });
            } catch (e) {
              // console.log(e);
            }
            setIsVoiceOn(false);
            setIsTimer(true);
            muteBtn.current.style.display = 'none';
            setIsMyTurn(false);
            setUsers((users) =>
              users.map((user) =>
                user.nickName === data.sender
                  ? { ...user, isMyTurn: true }
                  : { ...user, isMyTurn: false },
              ),
            );
          }
          break;
        }
        case 'SKIP': {
          setNotice(data.content);
          if (myNickName === data.sender) {
            setTimeout(function () {
              sendSpotlight();
            }, 2000);
          }
          break;
        }
        case 'FAIL': {
          setNotice(data.content);
          if (myNickName === data.nickname) {
            setTimeout(function () {
              sendSpotlight();
            }, 2000);
          }
          setIsWrongAnswerModal(true);
          break;
        }
        case 'SUCCESS': {
          setNotice(data.content);
          if (myNickName === data.nickname) {
            endEffect.play();
            setTimeout(function () {
              endGame();
            }, 2000);
          }
          setWinner(data.nickname);
          setIsEndGameModal(true);
          break;
        }
        case 'ENDGAME': {
          endEffect.play();
          muteBtn.current.style.display = 'block';
          leaveBtn.current.disabled = false;
          setNotice('');
          setCategory('');
          setKeyword('');
          setMyKeyword('');
          setIsSpotTimer(false);
          setIsTimer(false);
          setChatMessages((chatMessages) => [
            ...chatMessages,
            {
              sender: '양계장 주인',
              message: `"${myNickName}"의 키워드는 "${viewKeyWord}" (이)닭`,
            },
          ]);
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });
          } catch (e) {
            // console.log(e);
          }
          setIsVoiceOn(true);
          setUsers((users) =>
            users.map((user) => {
              return { ...user, isMyTurn: false };
            }),
          );
          setIsMyTurn(false);
          if (myNickName === sessionStorage.getItem('owner')) {
            startBtn.current.style.visibility = 'visible';
          }
          break;
        }
        case 'CAMERAON': {
          setUsers((oldUsers) =>
            oldUsers.map((user) =>
              user.nickName === data.nickname
                ? { ...user, isCameraOn: true }
                : user,
            ),
          );
          break;
        }
        case 'CAMERAOFF': {
          setUsers((oldUsers) =>
            oldUsers.map((user) =>
              user.nickName === data.nickname
                ? { ...user, isCameraOn: false }
                : user,
            ),
          );
          break;
        }
        case 'STUPID': {
          endEffect.play();
          muteBtn.current.style.display = 'block';
          leaveBtn.current.disabled = false;
          setNotice('');
          setCategory('');
          setKeyword('');
          setMyKeyword('');
          setIsSpotTimer(false);
          setIsTimer(false);
          setChatMessages((chatMessages) => [
            ...chatMessages,
            {
              sender: '양계장 주인',
              message: ` 너희들은 모두 바보닭!!
              "${myNickName}"의 키워드는 "${viewKeyWord}" (이)닭`,
            },
          ]);
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });
          } catch (e) {
            // console.log(e);
          }
          setIsVoiceOn(true);
          setUsers((users) =>
            users.map((user) => {
              return { ...user, isMyTurn: false };
            }),
          );
          setIsMyTurn(false);

          if (myNickName === sessionStorage.getItem('owner')) {
            startBtn.current.style.visibility = 'visible';
          }
          break;
        }
        case 'FORCEDENDGAME': {
          endEffect.play();
          if (myNickName === sessionStorage.getItem('owner')) {
            startBtn.current.style.visibility = 'visible';
            sendChat({ message: data.content, sender: data.sender });
          }
          endEffect.play();
          muteBtn.current.style.display = 'block';
          leaveBtn.current.disabled = false;
          setNotice('');
          setCategory('');
          setKeyword('');
          setMyKeyword('');
          setIsSpotTimer(false);
          setIsTimer(false);
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });
          } catch (e) {
            // console.log(e);
          }
          setIsVoiceOn(true);
          setUsers((users) =>
            users.map((user) => {
              return { ...user, isMyTurn: false };
            }),
          );
          setIsMyTurn(false);

          break;
        }
        default: {
          // console.log('default');
          break;
        }
      }
    });
  };
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => SockJs,
      connectHeaders,
      debug() {},
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        // console.log(`Broker reported error: ${frame.headers.message}`);
        // console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };

  // end stomp client section

  // stomp client method
  function sendChat({ message, sender }) {
    if (message.trim() === '') {
      return;
    }
    client.current.publish({
      destination: `/sub/gameRoom/${param.roomId}`,
      body: JSON.stringify({
        type: 'CHAT',
        roomId: param.roomId,
        sender,
        message,
      }),
    });
  }

  function endGame() {
    client.current.publish({
      destination: `/pub/game/${param.roomId}/endGame`,
    });
  }

  function skipAnswer(nickName) {
    client.current.publish({
      destination: `/pub/game/${param.roomId}/skip`,
      body: JSON.stringify({
        nickname: nickName,
      }),
    });
  }

  function sendAnswer(answerValue, nickName) {
    client.current.publish({
      destination: `/pub/game/${param.roomId}/answer`,
      body: JSON.stringify({
        answer: answerValue,
        nickname: nickName,
      }),
    });
  }

  function sendSpotlight() {
    client.current.publish({
      destination: `/pub/game/${param.roomId}/spotlight`,
    });
  }

  function gameStart() {
    if (users.length < 2) {
      useToast('최소 3마리가 필요하닭!', 'warning');
    }
    client.current.publish({
      destination: `/pub/game/${param.roomId}/start`,
      body: JSON.stringify({
        roomId: param.roomId,
        nickname: myNickName,
      }),
    });
    setTimeout(function () {
      sendSpotlight();
    }, 5000);
  }
  // end stomp client method

  // WebRTC createPeerConnection method for using WebRTC, section
  function createPeerConnection(
    socketID,
    socket,
    peerConnectionLocalStream,
    userNickName,
  ) {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });
    // add pc to peerConnections object
    const keyName = socketID;
    pcs = { ...pcs, [`${keyName}`]: pc };
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate,
            receiver: socketID,
            roomId: param.roomId,
          }),
        );
      }
    };
    pc.oniceconnectionstatechange = (e) => {
      // console.log(e);
    };

    if (userNickName === sessionStorage.getItem('owner')) {
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: null,
          nickName: userNickName,
          isCameraOn: false,
          isMyTurn: false,
          isOwner: true,
        },
      ]);
    } else {
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: null,
          nickName: userNickName,
          isCameraOn: false,
          isMyTurn: false,
          isOwner: false,
        },
      ]);
    }

    pc.ontrack = (e) => {
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      if (userNickName === sessionStorage.getItem('owner')) {
        setUsers((oldUsers) => [
          ...oldUsers,
          {
            id: socketID,
            stream: e.streams[0],
            nickName: userNickName,
            isCameraOn: true,
            isMyTurn: false,
            isOwner: true,
          },
        ]);
      } else {
        setUsers((oldUsers) => [
          ...oldUsers,
          {
            id: socketID,
            stream: e.streams[0],
            nickName: userNickName,
            isCameraOn: true,
            isMyTurn: false,
            isOwner: false,
          },
        ]);
      }
    };
    try {
      if (peerConnectionLocalStream) {
        peerConnectionLocalStream.getTracks().forEach((track) => {
          pc.addTrack(track, peerConnectionLocalStream);
        });
      }
    } catch (error) {
      // console.log(error);
    }
    return pc;
  }

  // end WebRTC createPeerConnection method for using WebRTC, section

  // section about user's media
  function onClickCameraOffHandler() {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (isCameraOn) {
      videoRef.current.style.display = 'none';
      userCardImgRef.current.style.display = 'block';
      client.current.publish({
        destination: `/pub/chat/camera`,
        body: JSON.stringify({
          type: 'CAMERAOFF',
          nickname: myNickName,
          roomId: param.roomId,
        }),
      });
      setIsCameraOn(false);
    } else {
      userCardImgRef.current.style.display = 'none';
      videoRef.current.style.display = 'block';
      client.current.publish({
        destination: `/pub/chat/camera`,
        body: JSON.stringify({
          type: 'CAMERAON',
          nickname: myNickName,
          roomId: param.roomId,
        }),
      });
      setIsCameraOn(true);
    }
  }
  function onClickMuteHandler() {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (isVoiceOn) {
      setIsVoiceOn(false);
    } else {
      setIsVoiceOn(true);
    }
  }

  async function getUserMedias() {
    const initialConstrains = {
      video: true,
      audio: true,
    };
    stream = await navigator.mediaDevices.getUserMedia(initialConstrains);
    return stream;
  }
  // end section about user's media

  // WebRTC signaling section
  useEffect(() => {
    setRefreshToken(getRefreshToken('RefreshToken'));
    // setAccessToken(getAccessToken('AccessToken'));
    if (!sessionStorage.getItem('normalEnter')) {
      useToast('정상적인 접근이 아닙니다', 'warning');
      navigate('/rooms');
    }
    connect();
    socketRef.current = new SockJS(`${process.env.REACT_APP_SIGNAL_URL}`);

    socketRef.current.onopen = async () => {
      await getUserMedias()
        .then((streamMedia) => {
          if (videoRef.current) {
            videoRef.current.srcObject = streamMedia;
            streamMedia.getVideoTracks().forEach((track) => {
              track.enabled = !track.enabled;
            });
            setIsCameraOn(false);
          }
        })
        .catch((error) => {
          userCardImgRef.current.style.display = 'block';
          videoRef.current.style.display = 'none';
          // console.log(`getUserMedia error: ${error}`);
        });

      socketRef.current?.send(
        JSON.stringify({
          type: 'join_room',
          roomId: param.roomId,
          nickname: myNickName,
        }),
      );
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'all_users': {
          const { allUsers } = data;
          const { allUsersNickNames } = data;
          for (let i = 0; i < allUsers.length; i += 1) {
            createPeerConnection(
              allUsers[i],
              socketRef.current,
              stream,
              allUsersNickNames[`${allUsers[i]}`],
            );

            const allUsersEachPc = pcs[`${allUsers[i]}`];
            if (allUsersEachPc) {
              allUsersEachPc
                .createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true,
                })
                .then((offer) => {
                  allUsersEachPc.setLocalDescription(offer);
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'offer',
                      offer,
                      receiver: allUsers[i],
                      roomId: param.roomId,
                      nickname: myNickName,
                    }),
                  );
                })
                .catch((error) => {
                  // console.log(error);
                });
            }
          }

          break;
        }
        case 'offer': {
          createPeerConnection(
            data.sender,
            socketRef.current,
            stream,
            data.senderNickName,
          );
          const offerPc = pcs[`${data.sender}`];
          if (offerPc) {
            offerPc.setRemoteDescription(data.offer).then(() => {
              offerPc
                .createAnswer()
                .then((answer) => {
                  offerPc.setLocalDescription(answer);
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'answer',
                      answer,
                      receiver: data.sender,
                      roomId: param.roomId,
                    }),
                  );
                })
                .catch((error) => {
                  // console.log(error);
                });
            });
          }

          break;
        }
        case 'answer': {
          const answerPc = pcs[`${data.sender}`];
          if (answerPc) {
            answerPc.setRemoteDescription(data.answer);
          }
          break;
        }
        case 'candidate': {
          const candidatePc = pcs[`${data.sender}`];
          if (candidatePc) {
            candidatePc.addIceCandidate(data.candidate).then(() => {});
          }
          break;
        }
        case 'leave': {
          pcs[`${data.sender}`].close();
          delete pcs[`${data.sender}`];
          instance
            .get(`/rooms/${param.roomId}/ownerInfo`)
            .then((res) => {
              sessionStorage.setItem('owner', res.data.ownerNickname);
              if (sessionStorage.getItem('owner') === myNickName) {
                setIsOwner(true);
              } else {
                setUsers((oldUsers) =>
                  oldUsers.map((user) =>
                    sessionStorage.getItem('owner') === user.nickName
                      ? { ...user, isOwner: true }
                      : user,
                  ),
                );
              }
            })
            .catch((error) => {
              // console.log(error);
            });

          setUsers((oldUsers) =>
            oldUsers.filter((user) => user.id !== data.sender),
          );

          break;
        }
        default: {
          break;
        }
      }
    };
    return async () => {
      sessionStorage.clear();
      instance
        .delete(`rooms/${param.roomId}/exit`)
        .then(async () => {
          socketRef.current.close();
          client.current.deactivate();
        })
        .catch(async () => {
          socketRef.current.close();
          client.current.deactivate();
        });
    };
  }, []);
  // end WebRTC signaling section

  function leaveRoom() {
    sessionStorage.clear();
    navigate('/rooms');
  }

  function usePrevious(users) {
    const ref = useRef();
    useEffect(() => {
      ref.current = users;
    });
    return ref.current;
  }
  usePrevious(users);
  useEffect(() => {
    if (myNickName === sessionStorage.getItem('owner')) {
      setIsOwner(true);
    }
  }, [isOwner, sessionStorage.getItem('owner')]);
  useEffect(() => {}, [stream, socketRef.current]);

  usePreventGoBack();
  usePreventRefresh();

  return (
    <StGameRoomRTC>
      <div>
        {isStartModal && (
          <ToastMessage setToastState={setIsStartModal} type="start" />
        )}
        {isEndGameModal && (
          <ToastMessage setToastState={setIsEndGameModal} type="end" />
        )}
        {isWrongAnswerModal && (
          <ToastMessage setToastState={setIsWrongAnswerModal} type="fail" />
        )}
      </div>
      <StGameRoomHeader>
        <StLeaveBtn
          ref={leaveBtn}
          onClick={() => {
            leaveRoom();
          }}
        >
          &nbsp;
        </StLeaveBtn>
        {isOwner && (
          <StStartBtn ref={startBtn} onClick={gameStart}>
            &nbsp;
          </StStartBtn>
        )}
        <>
          {isSpotTimer && (
            <SpotTimer
              setIsSpotTimer={setIsSpotTimer}
              setIsMyTurnModal={setIsMyTurnModal}
            />
          )}
          {isTimer && <Timer setIsTimer={setIsTimer} />}
          {isMyTurnModal && (
            <GameModal
              content={
                <GameAnswerModal
                  setIsMyTurnModal={setIsMyTurnModal}
                  sendAnswer={sendAnswer}
                  nickName={myNickName}
                  skipAnswer={skipAnswer}
                />
              }
            />
          )}
        </>
      </StGameRoomHeader>
      <StGameRoomMain>
        <StGameCategoryAndUserCards>
          <StCategoryBack>
            <StCategoryText>{category || '주제'}</StCategoryText>
          </StCategoryBack>
          <StUserCards>
            <StCard>
              {isMyTurn && (
                <>
                  <StCardSpotLight />
                  <StNickSpotLight>{myNickName}</StNickSpotLight>
                </>
              )}
              <StKeywordBack>
                {isOwner ? (
                  <StStar>
                    <img src={star} alt="별" />
                  </StStar>
                ) : (
                  <div />
                )}
                <StKeyword>{myKeyword || '키워드'}</StKeyword>
              </StKeywordBack>
              <StVideoBox>
                <StVideo className={isMyTurn ? 'spotLight' : ''}>
                  <video
                    className={isMyTurn ? 'spotLight' : ''}
                    muted
                    ref={videoRef}
                    id="myFace"
                    autoPlay
                    playsInline
                  />
                </StVideo>
                <Stimg
                  className={isMyTurn ? 'spotLight' : ''}
                  ref={userCardImgRef}
                  src={playerImg}
                  alt="닭 일러스트"
                />
              </StVideoBox>
              <StVoiceCameraBox>
                <StCameraImg
                  ref={cameraBtn}
                  src={isCameraOn ? cameraOn : cameraOff}
                  onClick={() => {
                    onClickCameraOffHandler();
                  }}
                />
                <StVoiceImg
                  src={isVoiceOn ? voiceOn : voiceOff}
                  ref={muteBtn}
                  onClick={() => {
                    onClickMuteHandler();
                  }}
                />
              </StVoiceCameraBox>
              <StNickName>{myNickName}</StNickName>
            </StCard>
            {users.map((user) => {
              return (
                <StCard
                  className={user.isMyTurn ? 'spotLight' : ''}
                  key={user.id}
                >
                  <Audio
                    key={user.id}
                    stream={user.stream}
                    nickName={user.nickName}
                    isCameraOn={user.isCameraOn}
                    keyword={keyword}
                    isMyTurn={user.isMyTurn}
                    isOwner={user.isOwner}
                  >
                    <track kind="captions" />
                  </Audio>
                </StCard>
              );
            })}
          </StUserCards>
        </StGameCategoryAndUserCards>
        <ChatBox
          notice={
            notice || (
              <p>
                게임 진행 시 <span>공지사항</span> 을 안내해 드립니다.
              </p>
            )
          }
          sendChat={sendChat}
          client={client}
          chatMessages={chatMessages}
        />
      </StGameRoomMain>
    </StGameRoomRTC>
  );
}

const StGameRoomRTC = styled.div`
  height: calc(100vh - 85px);
  padding-top: 40px;
`;

const StGameRoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`;

const StLeaveBtn = styled.button`
  background-image: url(${backBtn});
  background-size: center;
  background-repeat: no-repeat;
  margin-right: auto;
  width: 80px;
  height: 80px;
`;

const StStartBtn = styled.button`
  background-image: url(${gameStartBtn});
  background-size: center;
  background-repeat: no-repeat;
  width: 210px;
  height: 79px;
  margin-right: 171px;
`;

const StGameRoomMain = styled.div`
  display: grid;
  grid-template-columns: 585px 540px;
  grid-gap: 44px;
`;

const StGameCategoryAndUserCards = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const StCategoryBack = styled.div`
  background-image: url(${categoryImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 403px;
  height: 133px;
  margin: 0 auto;
`;

const StCategoryText = styled.div`
  font-size: 40px;
  font-weight: 800;
  text-align: center;
  line-height: 48px;
  letter-spacing: 0.08em;
  color: #5d3714;
  padding-top: 34px;
`;

const StUserCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-image: url(${userCardImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 585px;
  height: 614px;
  margin-top: 38px;
  padding: 25px;
`;

const StCard = styled.div`
  width: 260px;
  height: 274px;
  background-color: #f5f5f5;
  border: 6px solid #f5c86f;
  border-radius: 20px;
  position: relative;
`;

const StCardSpotLight = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  width: 261px;
  height: 274px;
  border-radius: 20px;
  background: #76a427;
  border: 6px solid #93bf45;
`;

const StNickSpotLight = styled.div`
  position: absolute;
  bottom: -6px;
  left: -6px;
  width: 260px;
  height: 65px;
  border-radius: 0 0 20px 20px;
  background: #bedc8a;
  border: 6px solid #93bf45;
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  padding-top: 16px;
`;

const StKeywordBack = styled.div`
  position: relative;
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto 0 auto;
`;

const StKeyword = styled.div`
  font-family: MapoBackpacking;
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  padding-top: 15px;
`;

const StStar = styled.div`
  position: absolute;
  top: -9px;
  left: -20px;
  height: 60px;
  z-index: 100;
`;

const StVideoBox = styled.div`
  max-width: 150px;
  height: 140px;
  overflow: hidden;
  margin: 0 auto;
  .spotLight {
    position: relative;
  }
`;

const StVideo = styled.div`
  video {
    width: 150px;
    height: 143px;
    display: none;
    .spotLight {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
`;

const Stimg = styled.img`
  height: unset;
  .spotLight {
    position: absolute;
    left: 0;
    top: 0;
    height: 200px;
  }
`;

const StVoiceImg = styled.img`
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: inline-block;
`;

const StCameraImg = styled.img`
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: inline-block;
  margin-bottom: 6px;
`;

const StVoiceCameraBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 14px;
  top: 70px;
  z-index: 900;
  margin-left: auto;
  margin-top: 10px;
`;

const StNickName = styled.span`
  background: #ffe9bc;
  border-top: 6px solid #f5c86f;
  display: block;
  height: 23%;
  border-radius: 0 0 17px 17px;
  padding-bottom: 17px;
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  padding-top: 16px;
`;

export default GameRoomRTC;
