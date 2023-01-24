/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
// 외부모듈
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import * as StompJs from '@stomp/stompjs';

// 내부모듈
import useToast from 'hooks/useToast';

// 이미지 파일
import voiceOn from 'assets/images/voiceOn.svg';
import voiceOff from 'assets/images/voiceOff.svg';
import cameraOff from 'assets/images/cameraOff.svg';
import cameraOn from 'assets/images/cameraOn.svg';
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';
import gameStartBtn from 'assets/images/startBtn.svg';
import categoryImg from 'assets/images/category.svg';
import star from 'assets/images/star.svg';
import keywordImg from 'assets/images/keyword.svg';
import userCardImg from 'assets/images/userCardImg.svg';
import playerImg from 'assets/images/playerImg.svg';
import ownerImg from 'assets/images/ownerImg.svg';
import GameModal from 'components/common/Modals/InGameModal/GameModal';
import GameAnswerModal from 'components/common/Modals/InGameModal/GameAnswerModal';
import ToastMessage from 'components/common/Toast/ToastMessage';
import { instance } from 'api/core/axios';
import { getNicknameCookie } from 'utils/cookies';
import Timer from '../Timer/Timer';
import SpotTimer from '../Timer/SpotTimer';
import Audio from './Audio';
import ChatBox from './ChatBox';

// let 전역변수
let stream = null;
let pcs = {};
let myPeerConnection;

function GameRoomRTC() {
  const SockJs = new SockJS('https://api.namoldak.com/ws-stomp');

  // const SockJs = new SockJS('http://13.209.84.31:8080/ws-stomp');

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

  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  // stomp client section
  const subscribe = async () => {
    client.current.subscribe(`/sub/gameRoom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      switch (data.type) {
        case 'ENTER': {
          // console.log('enter');
          break;
        }
        case 'CHAT': {
          setChatMessages((chatMessages) => [...chatMessages, data]);
          break;
        }
        case 'START': {
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = false;
            });
          } catch (erorr) {
            console.log(erorr);
          }
          setIsStartModal(true);
          setCategory(data.content.category);
          setKeyword(data.content.keyword);
          setMyKeyword('???');
          if (myNickName === owner) {
            startBtn.current.disabled = true;
            leaveBtn.current.disabled = true;
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
              console.log(e);
            }
          } else {
            try {
              stream.getAudioTracks().forEach((track) => {
                track.enabled = false;
              });
            } catch (e) {
              console.log(e);
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
          break;
        }
        case 'SUCCESS': {
          setNotice(data.content);
          if (myNickName === data.nickname) {
            setTimeout(function () {
              endGame();
            }, 2000);
          }
          setWinner(data.nickname);
          setIsEndGameModal(true);
          break;
        }
        case 'ENDGAME': {
          muteBtn.current.style.display = 'block';
          leaveBtn.current.disabled = false;
          setNotice('');
          setCategory('');
          setKeyword('');
          setMyKeyword('');
          try {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });
          } catch (e) {
            console.log(e);
          }
          setIsVoiceOn(true);
          setUsers((users) =>
            users.map((user) => {
              return { ...user, isMyTurn: false };
            }),
          );
          setIsMyTurn(false);

          if (myNickName === owner) {
            startBtn.current.disabled = false;
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
        console.log(`Broker reported error: ${frame.headers.message}`);
        console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };

  // end stomp client section

  // stomp client method
  function sendChat(message) {
    if (message.trim() === '') {
      return;
    }
    client.current.publish({
      destination: `/sub/gameRoom/${param.roomId}`,
      body: JSON.stringify({
        type: 'CHAT',
        roomId: param.roomId,
        sender: myNickName,
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

  // eslint-disable-next-line consistent-return
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
    ownerNickName,
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
    // eslint-disable-next-line no-unused-expressions
    userNickName === ownerNickName
      ? setUsers((oldUsers) => [
          ...oldUsers,
          {
            id: socketID,
            stream: null,
            nickName: userNickName,
            isCameraOn: false,
            isMyTurn: false,
            isOwner: true,
          },
        ])
      : setUsers((oldUsers) => [
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
    pc.ontrack = (e) => {
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      // eslint-disable-next-line no-unused-expressions
      userNickName === ownerNickName
        ? setUsers((oldUsers) => [
            ...oldUsers,
            {
              id: socketID,
              stream: e.streams[0],
              nickName: userNickName,
              isCameraOn: true,
              isMyTurn: false,
              isOwner: true,
            },
          ])
        : setUsers((oldUsers) => [
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
    };
    try {
      if (peerConnectionLocalStream) {
        peerConnectionLocalStream.getTracks().forEach((track) => {
          pc.addTrack(track, peerConnectionLocalStream);
        });
      } else {
        console.log('no local stream');
      }
    } catch (error) {
      console.log(error);
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
    socketRef.current = new SockJS('https://api.namoldak.com/signal');

    // socketRef.current = new SockJS('http://13.209.84.31:8080/signal');

    socketRef.current.onopen = async () => {
      await getUserMedias()
        .then((streamMedia) => {
          if (videoRef.current) {
            videoRef.current.srcObject = streamMedia;
          }
        })
        .catch((error) => {
          userCardImgRef.current.style.display = 'block';
          videoRef.current.style.display = 'none';
          console.log(`getUserMedia error: ${error}`);
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
          instance.get(`/rooms/${param.roomId}/ownerInfo`).then((res) => {
            for (let i = 0; i < allUsers.length; i += 1) {
              createPeerConnection(
                allUsers[i],
                socketRef.current,
                stream,
                allUsersNickNames[`${allUsers[i]}`],
                res.data.ownerNickname,
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
                    console.log(error);
                  });
              }
            }
          });

          break;
        }
        case 'offer': {
          instance.get(`/rooms/${param.roomId}/ownerInfo`).then((res) => {
            createPeerConnection(
              data.sender,
              socketRef.current,
              stream,
              data.senderNickName,
              res.data.ownerNickname,
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
                    console.log(error);
                  });
              });
            }
          });

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
            .then(async (res) => {
              await sessionStorage.setItem('owner', res.data.ownerNickname);
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
              console.log(error);
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
        .then(async (res) => {
          socketRef.current.close();
        })
        .catch(async (error) => {
          socketRef.current.close();
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
    if (myNickName === owner) {
      setIsOwner(true);
    }
  }, [isOwner, owner]);
  useEffect(() => {}, [stream, socketRef.current]);
  useEffect(() => {
    connect(); // 연결된 경우 렌더링
  }, []);

  return (
    <StGameRoomRTC>
      <div>
        {isStartModal && (
          <ToastMessage setToastState={setIsStartModal} type="start" />
        )}
        {isEndGameModal && (
          <ToastMessage setToastState={setIsEndGameModal} type="end" />
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
        <StHeaderBtnBox>
          <div>
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
          </div>
          {isOwner && (
            <StStartBtn ref={startBtn} onClick={gameStart}>
              {/* <img src={gameStartBtn} alt="게임시작" /> */}
              &nbsp;
            </StStartBtn>
          )}
          <StSettingBtn>
            <img src={settingBtn} alt="설정버튼" />
          </StSettingBtn>
        </StHeaderBtnBox>
      </StGameRoomHeader>
      <StGameRoomMain>
        <StGameCategoryAndUserCards>
          <StCategoryBack>
            <StCategoryText style={{ color: '#4e2d0a' }}>
              {category || '주제'}
            </StCategoryText>
          </StCategoryBack>
          <StUserCards>
            <StCard
              className={isMyTurn ? 'spotLight' : ''}
              // style={{ backgroundColor: 'red' }}
            >
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
                <StVideo>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    muted
                    ref={videoRef}
                    id="myFace"
                    autoPlay
                    playsInline
                  />
                </StVideo>
                <Stimg ref={userCardImgRef} src={playerImg} alt="닭 일러스트" />
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
              </StVideoBox>
              <StNickName className={isMyTurn ? 'spotLight' : ''}>
                {myNickName}
              </StNickName>
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
  width: 100%;
`;

const StGameRoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 78px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StLeaveBtn = styled.button`
  background-image: url(${backBtn});
  background-size: center;
  background-repeat: no-repeat;
  margin-right: auto;
  width: 80px;
`;

const StStartBtn = styled.button`
  background-image: url(${gameStartBtn});
  background-size: center;
  background-repeat: no-repeat;
  margin-right: auto;
  width: 210px;
`;

const StHeaderBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StSettingBtn = styled.button`
  margin-left: 100px;
`;

const StGameRoomMain = styled.div`
  display: grid;
  grid-template-columns: 600px 520px;
  grid-gap: 40px;
`;

const StGameCategoryAndUserCards = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const StCategoryBack = styled.div`
  background-image: url(${categoryImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 410px;
  height: 140px;
  margin: 0 auto;
`;

const StCategoryText = styled.div`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  line-height: 130px;
`;

const StUserCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-image: url(${userCardImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 590px;
  height: 620px;
  margin-top: 22px;
  padding: 30px;
`;

const StCard = styled.div`
  width: 260px;
  height: 274px;
  background-color: #f5f5f5;
  border: 6px solid #f5c86f;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  .spotLight {
    background: ${({ theme }) => theme.colors.green};
    border-color: ${({ theme }) => theme.colors.deepGreen};
  }
`;

const StKeywordBack = styled.div`
  position: relative;
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto 0 auto;

  .spotLight {
    background: ${({ theme }) => theme.colors.green};
    border-color: ${({ theme }) => theme.colors.deepGreen};
    z-index: 900;
  }
`;

const StKeyword = styled.div`
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding-top: 15px;
`;

const StStar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  z-index: 100;
`;

const StVideoBox = styled.div`
  max-width: 150px;
  height: 140px;
  overflow: hidden;
  margin: 0 auto;
`;

const StVideo = styled.div`
  video {
    width: 150px;
    height: 143px;
  }
`;

const StNickName = styled.span`
  display: block;
  height: 50%;
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  background: #ffe9bc;
  border-top: 6px solid #f5c86f;
  padding-top: 16px;

  .spotLight {
    background: ${({ theme }) => theme.colors.lightGreen};
    border-color: ${({ theme }) => theme.colors.green};
  }
`;

const Stimg = styled.img`
  display: none;
  height: unset;
`;

const StVoiceImg = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: inline-block;
`;

const StCameraImg = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: inline-block;
  margin-bottom: 4px;
`;

const StVoiceCameraBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 14px;
  top: 70px;
  z-index: 900;
  margin-left: auto;
`;

export default GameRoomRTC;
