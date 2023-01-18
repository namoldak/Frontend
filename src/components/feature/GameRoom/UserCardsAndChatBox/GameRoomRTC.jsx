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
import { instance } from '../../../../api/core/axios';
import { getNicknameCookie } from '../../../../utils/cookies';
import ChatBox from './ChatBox';
import Audio from './Audio';
import ToastMessage from '../../../common/Toast/ToastMessage';
import SpotTimer from '../TitleAndTimer/SpotTimer';
import Timer from '../TitleAndTimer/Timer';
import GameAnswerModal from '../../../common/Modals/InGameModal/GameAnswerModal';
import GameModal from '../../../common/Modals/InGameModal/GameModal';
import duckImg from '../../../../assets/images/duck.jpg';
import backBtn from '../../../../assets/images/backBtn.svg';
import settingBtn from '../../../../assets/images/settingBtn.svg';
import gameStartBtn from '../../../../assets/images/startBtn.svg';
import categoryImg from '../../../../assets/images/category.svg';
import keywordImg from '../../../../assets/images/keyword.svg';
import userCardImg from '../../../../assets/images/userCardImg.svg';

let stream = null;
let pcs = {};
let muted = false;
let cameraOff = false;
let myPeerConnection;
function GameRoomRTC() {
  // const SockJs = new SockJS('https://api.namoldak.com/ws-stomp');
  const SockJs = new SockJS('http://13.209.84.31:8080/ws-stomp');
  const dispatch = useDispatch();
  const myNickName = getNicknameCookie('nickname');
  const navigate = useNavigate();

  const owner = sessionStorage.getItem('owner');
  const socketRef = useRef();

  const userCardImgRef = useRef(null);
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const startBtn = useRef(null);
  const leaveBtn = useRef(null);

  const param = useParams();
  const { roomId } = param;
  const [isStartModal, setIsStartModal] = useState(false);
  const [isSpotTimer, setIsSpotTimer] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [isMyTurnModal, setIsMyTurnModal] = useState(false);
  const [isEndGameModal, setIsEndGameModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState('');
  const [notice, setNotice] = useState('');

  function usePrevious(users) {
    const ref = useRef();
    useEffect(() => {
      ref.current = users;
    });
    return ref.current;
  }
  usePrevious(users);

  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [myKeyword, setMyKeyword] = useState('');

  /// ////////////////////////////////////////!SECTION
  const client = useRef({});
  const [cookie] = useCookies();
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  const subscribe = async () => {
    client.current.subscribe(`/sub/gameRoom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      console.log('data', data);
      switch (data.type) {
        case 'START': {
          stream.getAudioTracks().forEach((track) => {
            track.enabled = false;
          });
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
            stream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });
            setIsSpotTimer(true);
            muteBtn.current.disabled = false;
          } else {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = false;
            });
            setIsTimer(true);
            muteBtn.current.disabled = true;
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
          setNotice('');
          setCategory('');
          setKeyword('');
          setMyKeyword('');
          stream.getAudioTracks().forEach((track) => {
            track.enabled = true;
          });
          if (myNickName === owner) {
            startBtn.current.disabled = false;
            muteBtn.current.disabled = false;
            leaveBtn.current.disabled = false;
          } else {
            muteBtn.current.disabled = false;
            leaveBtn.current.disabled = false;
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

  useEffect(() => {
    connect(); // 연결된 경우 렌더링
  }, []);

  /// ////////////////////////////////////////!SECTION

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
      alert('최소 3마리가 필요하닭!');
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
    console.log(socketID);
    console.log(socket);
    console.log(peerConnectionLocalStream);
    const keyName = socketID;
    pcs = { ...pcs, [`${keyName}`]: pc };
    console.log(pcs);
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
    setUsers((oldUsers) => [
      ...oldUsers,
      {
        id: socketID,
        stream: null,
        nickName: userNickName,
        isCameraOn: false,
      },
    ]);
    pc.ontrack = (e) => {
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
          nickName: userNickName,
          isCameraOn: true,
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

  function onClickCameraOffHandler() {
    // eslint-disable-next-line no-use-before-define
    console.log(stream);
    stream.getVideoTracks().forEach((track) => {
      console.log(track);
      track.enabled = !track.enabled;
    });

    if (!cameraOff) {
      cameraBtn.current.innerText = '카메라켜기';
      cameraOff = !cameraOff;
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
    } else {
      userCardImgRef.current.style.display = 'none';
      videoRef.current.style.display = 'block';
      cameraBtn.current.innerText = '카메라끄기';
      client.current.publish({
        destination: `/pub/chat/camera`,
        body: JSON.stringify({
          type: 'CAMERAON',
          nickname: myNickName,
          roomId: param.roomId,
        }),
      });
      cameraOff = !cameraOff;
    }
  }
  function onClickMuteHandler() {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!muted) {
      muteBtn.current.innerText = '소리켜기';
      muted = !muted;
    } else {
      muteBtn.current.innerText = '소리끄기';
      muted = !muted;
    }
  }

  async function getCameras() {
    try {
      // 유저의 장치를 얻어옵니다
      const devices = await navigator.mediaDevices.enumerateDevices();
      // 얻어온 유저의 장치들에서 카메라장치만 필터링 합니다
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      // 현재내가 사용중인 카메라의 label명을 셀렉트란에 보여주기위한 과정입니다.
      //  아래의 if문과 이어서 확인 해주세요
      const currentCamera = stream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        cameraOption.current.value = camera.deviceId;
        cameraOption.current.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          cameraOption.current.selected = true;
        }
        camerasSelect.current.appendChild(cameraOption.current);
      });
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    if (myNickName === owner) {
      setIsOwner(true);
    }
  }, [isOwner, owner]);
  useEffect(() => {
    // socketRef.current = new SockJS('https://api.namoldak.com/signal');
    socketRef.current = new SockJS('http://13.209.84.31:8080/signal');
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
          console.log(allUsers);
          console.log(allUsersNickNames);
          for (let i = 0; i < allUsers.length; i += 1) {
            console.log(stream);
            createPeerConnection(
              allUsers[i],
              socketRef.current,
              stream,
              allUsersNickNames[`${allUsers[i]}`],
            );
            console.log(pcs);

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
                  console.log(error);
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
            .then(async (res) => {
              console.log(res.data.ownerNickname);
              await sessionStorage.setItem('owner', res.data.ownerNickname);
              if (sessionStorage.getItem('owner') === myNickName) {
                setIsOwner(true);
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
      if (socketRef.current) {
        sessionStorage.clear();
        instance
          .delete(`rooms/${param.roomId}/exit`)
          .then(async (res) => {
            navigate('/rooms');
          })
          .catch(async (error) => {
            navigate('/rooms');
          });
        socketRef.current.close();
      }
    };
  }, []);

  function leaveRoom() {
    sessionStorage.clear();
    navigate('/rooms');
  }

  async function onInputCameraChange() {
    await getUserMedias(camerasSelect.current.value);
    if (myPeerConnection) {
      const videoTrack = stream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === 'video');
      videoSender.replaceTrack(videoTrack);
    }
  }

  useEffect(() => {
    console.log('stream:', stream);
  }, [stream, socketRef.current]);

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
          <img src={backBtn} alt="back_image" />
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
                    roomId={roomId}
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
            <button ref={startBtn} onClick={gameStart}>
              <img src={gameStartBtn} alt="게임시작" />
            </button>
          )}
          {/* {isOwner ? (
            <button ref={startBtn} onClick={gameStart}>
              <img src={gameStartBtn} alt="게임시작" />
            </button>
          ) : (
            <div>방장이아닙니다</div>
          )} */}
          <StSettingBtn>
            <img src={settingBtn} alt="setting_image" />
          </StSettingBtn>
        </StHeaderBtnBox>
        {/* <button onClick={sendSpotlight}>스팟보내기</button> */}
      </StGameRoomHeader>
      <StGameRoomMain>
        <StGameCategoryAndUserCards>
          <StCategoryBack>
            <StCategoryText>{category || '주제'}</StCategoryText>
          </StCategoryBack>
          <StUserCards>
            <StCard>
              <StKeywordBack>
                <StKeyword>{myKeyword || '키워드'}</StKeyword>
              </StKeywordBack>
              <StVideoBox>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  muted
                  ref={videoRef}
                  id="myFace"
                  autoPlay
                  playsInline
                  width={200}
                  height={200}
                >
                  비디오
                </video>
                <Stimg
                  ref={userCardImgRef}
                  src={duckImg}
                  alt=""
                  width={200}
                  height={200}
                />
                <button
                  ref={muteBtn}
                  onClick={() => {
                    onClickMuteHandler();
                  }}
                >
                  mute
                </button>
                <button ref={cameraBtn} onClick={onClickCameraOffHandler}>
                  camera OFF
                </button>
                <select ref={camerasSelect} onInput={onInputCameraChange}>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <option ref={cameraOption} value="device" />
                </select>
              </StVideoBox>
              <StNickName>{myNickName}님</StNickName>
            </StCard>
            {users.map((user) => {
              return (
                <StCard key={user.id}>
                  <Audio
                    key={user.id}
                    stream={user.stream}
                    nickName={user.nickName}
                    isCameraOn={user.isCameraOn}
                    keyword={keyword}
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
                게임 진행 시 <span>공지사항</span>을 안내해 드립니다.
              </p>
            )
          }
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
  margin-right: auto;
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

const StCategoryText = styled.p`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  line-height: 130px;
  color: '#5D3714';
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
  border: 6px solid #f5c86f;
  border-radius: 20px;
  /* overflow: hidden; */
`;

const StVideoBox = styled.div`
  width: 150px;
  max-width: 150px;
  min-height: 150px;
  margin: 0 auto;

  video {
    width: 100%;
    height: 100%;
  }
`;

const StKeywordBack = styled.div`
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto;
`;

const StKeyword = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding-top: 15px;
`;

const StNickName = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  border-top: 6px solid #f5c86f;
  padding: 7px 0;
`;

const Stimg = styled.img`
  display: none;
`;

export default GameRoomRTC;
