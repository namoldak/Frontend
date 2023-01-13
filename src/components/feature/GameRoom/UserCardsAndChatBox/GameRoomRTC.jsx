// 외부모듈
import styled from 'styled-components';
import React, { useRef, useEffect, useState, Children } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import * as StompJs from '@stomp/stompjs';

// 내부모듈
import { instance } from '../../../../api/core/axios';
import GameRoomChoice from './GameRoomChoice';
import { getNicknameCookie } from '../../../../utils/cookies';
import ChatBox from './ChatBox';
import Audio from './Audio';
import { enterRoom } from '../../../../redux/modules/roomSlice';
import ToastMessage from '../../../common/Toast/ToastMessage';

function GameRoomRTC() {
  const SockJsRTC = new SockJS('https://namoldak.com/signal');
  const SockJs = new SockJS('https://namoldak.com/ws-stomp');
  const dispatch = useDispatch();
  const myNickName = getNicknameCookie('nickname');
  console.log(myNickName);
  const navigate = useNavigate();

  const owner = sessionStorage.getItem('owner');
  const [roomOwner, setRoomOwner] = useState(owner);
  const socketRef = useRef();

  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const param = useParams();
  const [isStartModalOn, setIsStartModalOn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [users, setUsers] = useState([]);

  let pcs = {};
  let muted = false;
  let cameraOff = false;
  let stream;
  let myPeerConnection;

  /// ////////////////////////////////////////!SECTION
  const client = useRef({});
  const [cookie] = useCookies();
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };
  const subscribe = async () => {
    client.current.subscribe(`/sub/gameroom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      // console.log('subscribe data', data);
      console.log('1');
      switch (data.type) {
        case 'start': {
          setIsStartModalOn(true);
          break;
        }

        default: {
          // console.log('default');
          console.log('6');
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

  function gameStart() {
    client.current.publish({
      destination: `/sub/gameroom/${param.roomId}`,
      body: JSON.stringify({
        type: 'start',
      }),
    });
  }
  function createPeerConnection(socketID, socket, peerConnectionLocalStream) {
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
        console.log('onicecandidate');
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
    // function handleAddStream(data) {
    //   console.log(data);
    //   anotherVideoRef.current.srcObject = data.stream;
    //   console.log('got an stream from my peer');
    //   console.log("Peer's Stream", data.stream);
    //   console.log('My stream', stream);
    // }
    // pc.onaddstream = (e) => {
    //   handleAddStream(e);
    // };
    pc.ontrack = (e) => {
      console.log('ontrack success');
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
        },
      ]);
    };
    if (peerConnectionLocalStream) {
      console.log('localstream add');
      peerConnectionLocalStream.getTracks().forEach((track) => {
        pc.addTrack(track, peerConnectionLocalStream);
      });
    } else {
      console.log('no local stream');
      console.log(peerConnectionLocalStream);
    }
    return pc;
  }

  function onClickCameraOffHandler() {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!cameraOff) {
      cameraBtn.current.innerText = 'OFF';
      cameraOff = !cameraOff;
    } else {
      cameraBtn.current.innerText = 'ON';
      cameraOff = !cameraOff;
    }
  }
  function onClickMuteHandler() {
    console.log('stream:', stream);
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (!muted) {
      muteBtn.current.innerText = 'Unmute';
      muted = !muted;
    } else {
      muteBtn.current.innerText = 'Mute';
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

  async function getUserMedia(deviceId) {
    const initialConstrains = {
      video: { facingMode: 'user' },
      audio: true,
    };
    const cameraConstrains = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      stream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstrains : initialConstrains,
      );
      videoRef.current.srcObject = stream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (err) {
      console.log(err);
    }
    return stream;
  }

  useEffect(() => {
    if (myNickName === owner) {
      setIsOwner(true);
    }
  }, [isOwner, owner]);
  useEffect(() => {
    dispatch(enterRoom);
    socketRef.current = SockJsRTC;
    socketRef.current.onopen = () => {
      // navigator.mediaDevices
      // .getUserMedia({
      //   video: true,
      //   audio: true,
      // })
      getUserMedia()
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log(stream);
          }
          // eslint-disable-next-line no-self-assign
          stream = stream;
          socketRef.current?.send(
            JSON.stringify({
              type: 'join_room',
              roomId: param.roomId,
            }),
          );
        })
        .catch((error) => {
          console.log(`getUserMedia error: ${error}`);
        });
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.type);
      switch (data.type) {
        case 'all_users': {
          console.log('all_user recieve');
          console.log(data.allUsers);
          const { allUsers } = data;
          for (let i = 0; i < allUsers.length; i += 1) {
            console.log(stream);
            createPeerConnection(allUsers[i], socketRef.current, stream);
            console.log(pcs);

            const allUsersEachPc = pcs[`${allUsers[i]}`];
            if (allUsersEachPc) {
              allUsersEachPc
                .createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true,
                })
                .then((offer) => {
                  console.log('create offer success');
                  allUsersEachPc.setLocalDescription(offer);
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'offer',
                      offer,
                      receiver: allUsers[i],
                      roomId: param.roomId,
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
          console.log('get offer');
          console.log(data);
          console.log(data.offer);
          createPeerConnection(data.sender, socketRef.current, stream);
          const offerPc = pcs[`${data.sender}`];
          if (offerPc) {
            offerPc.setRemoteDescription(data.offer).then(() => {
              console.log('answer set remote description success');
              offerPc
                .createAnswer({
                  offerToReceiveVideo: true,
                  offerToReceiveAudio: true,
                })
                .then((answer) => {
                  console.log('create answer success');
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
          console.log('get answer');
          console.log(pcs, data);
          const answerPc = pcs[`${data.sender}`];
          console.log(answerPc.signalingState);
          if (answerPc) {
            console.log(answerPc);
            answerPc.setRemoteDescription(data.answer);
          }
          break;
        }
        case 'candidate': {
          console.log('get candidate');
          const candidatePc = pcs[`${data.sender}`];
          console.log(candidatePc.signalingState);
          if (candidatePc) {
            candidatePc.addIceCandidate(data.candidate).then(() => {
              console.log('candidate add success');
              console.log(data.candidate, pcs);
            });
          }
          break;
        }
        case 'leave': {
          console.log('delete', data.sender);
          pcs[`${data.sender}`].close();
          delete pcs[data.sender];

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
        case 'game_start': {
          console.log('게임.');

          gameStart();
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
        await instance
          .delete(`rooms/${param.roomId}/exit`)
          .then(async (res) => {
            console.log('res', res);
            await navigate('/rooms');
          })
          .catch(async (error) => {
            // alert(error.data.message);
            await navigate('/rooms');
          });
        socketRef.current.close();
      }
    };
  }, []);

  const leaveRoom = async () => {
    sessionStorage.clear();
    await instance
      .delete(`rooms/${param.roomId}/exit`)
      .then(async (res) => {
        console.log('res', res);
        await navigate('/rooms');
      })
      .catch(async (error) => {
        // alert(error.data.message);
        await navigate('/rooms');
      });
    await socketRef.current.close();
  };

  async function onInputCameraChange() {
    await getUserMedia(camerasSelect.current.value);
    if (myPeerConnection) {
      const videoTrack = stream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === 'video');
      videoSender.replaceTrack(videoTrack);
    }
  }

  return (
    <StGameRoomOuter>
      {isStartModalOn && (
        <ToastMessage setToastState={setIsStartModalOn} text="Game Start!" />
      )}
      <StGameRoomHeader>
        <Link to="/rooms">
          <button>뒤로가기</button>
        </Link>

        <button
          onClick={() => {
            leaveRoom();
          }}
        >
          방나가기
        </button>
        {isOwner ? (
          <button onClick={gameStart}>시작하기</button>
        ) : (
          <div>방장이아닙니다</div>
        )}

        <button>설정</button>
      </StGameRoomHeader>
      <GameRoomChoice props={param} />
      <StGameRoomMain>
        <StGameTitleAndUserCards>
          <StTitle>
            <h1>주제</h1>
          </StTitle>
          <StUserCards>
            <StCard>
              {' '}
              Card
              <h4>키워드</h4>
              <span>OOO님</span>
              <div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={videoRef}
                  id="myFace"
                  autoPlay
                  playsInline
                  width={200}
                  height={200}
                >
                  비디오
                </video>
                <button ref={muteBtn} onClick={onClickMuteHandler}>
                  mute
                </button>
                <button ref={cameraBtn} onClick={onClickCameraOffHandler}>
                  camera OFF
                </button>
                <select ref={camerasSelect} onInput={onInputCameraChange}>
                  <option>기본</option>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <option ref={cameraOption} value="device" />
                </select>
              </div>
            </StCard>
            {users.map((user) => {
              console.log(user);
              return (
                <StCard key={user.id}>
                  <Audio key={user.id} stream={user.stream}>
                    <track kind="captions" />
                  </Audio>
                </StCard>
              );
            })}
          </StUserCards>
        </StGameTitleAndUserCards>
        <StTimer>타이머:남은시간20초</StTimer>
        <ChatBox />
      </StGameRoomMain>
    </StGameRoomOuter>
  );
}

const StGameRoomOuter = styled.div`
  border: 5px solid black;
  display: grid;

  grid-template-rows: 100px 1fr;
`;
const StGameRoomHeader = styled.div`
  border: 3px solid red;
`;

const StGameRoomMain = styled.div`
  margin-top: 30px;
  border: 3px solid blue;
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
`;

const StGameTitleAndUserCards = styled.div`
  border: 2px solid black;
`;

const StTimer = styled.div`
  border: 2px solid black;
`;

const StChatBox = styled.div`
  border: 2px solid black;
  display: grid;
  grid-template-rows: 30px 1fr 30px;
`;

const StTitle = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-rows: 120px 1fr;
`;

const StUserCards = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const StCard = styled.div`
  border: 1px solid black;
`;

const StNotice = styled.div`
  border: 1px solid black;
`;

const StUserChatBox = styled.div`
  border: 1px solid black;
`;

const StSendChat = styled.div`
  border: 1px solid black;
`;

export default GameRoomRTC;
