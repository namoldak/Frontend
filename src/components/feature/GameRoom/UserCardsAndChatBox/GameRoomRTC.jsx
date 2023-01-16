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
import { getNicknameCookie } from '../../../../utils/cookies';
import ChatBox from './ChatBox';
import Audio from './Audio';
import { enterRoom } from '../../../../redux/modules/roomSlice';
import ToastMessage from '../../../common/Toast/ToastMessage';
import SpotTimer from '../TitleAndTimer/SpotTimer';
import Timer from '../TitleAndTimer/Timer';
import GameAnswerModal from '../../../common/Modals/InGameModal/GameAnswerModal';
import GameModal from '../../../common/Modals/InGameModal/GameModal';
import duckImg from '../../../../assets/images/duck.jpg';

let stream;
let pcs = {};
let muted = false;
let cameraOff = false;
let myPeerConnection;
function GameRoomRTC() {
  // const SockJsRTC = new SockJS('http://13.209.84.31:8080/signal');
  const SockJs = new SockJS('https://api.namoldak.com/ws-stomp');
  const dispatch = useDispatch();
  const myNickName = getNicknameCookie('nickname');
  const navigate = useNavigate();

  const owner = sessionStorage.getItem('owner');
  const [roomOwner, setRoomOwner] = useState(owner);
  const socketRef = useRef();

  const userCardImgRef = useRef(null);
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);

  const param = useParams();
  const { roomId } = param;
  const [isStartModalOn, setIsStartModalOn] = useState(false);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isMyTurnModal, setIsMyTurnModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [users, setUsers] = useState([]);

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
  // const [memberList, setMemberList] = useState('');

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
      console.log('데이터수신');
      switch (data.type) {
        case 'START': {
          // type은 대문자로 적기
          setIsStartModalOn(true);
          setCategory(data.content.category);
          setKeyword(data.content.keyword);
          setMyKeyword('나만 모른닭');
          break;
        }
        case 'SPOTLIGHT': {
          console.log('spotlight', data);
          if (myNickName === data.sender) {
            setIsStartTimer(true);
          }
          break;
        }
        case 'CAMERAON': {
          // console.log('prev', prevusers);
          console.log('users', users);
          console.log(data);
          setUsers((oldUsers) =>
            oldUsers.map((user) =>
              user.nickName === data.nickname
                ? { ...user, isCameraOn: true }
                : user,
            ),
          );

          console.log(users);
          break;
        }
        case 'CAMERAOFF': {
          // console.log(prevusers);
          console.log(data);
          setUsers((oldUsers) =>
            oldUsers.map((user) =>
              user.nickName === data.nickname
                ? { ...user, isCameraOn: false }
                : user,
            ),
          );
          console.log(users);

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

  function sendSpotlight() {
    console.log('sendspot');
    client.current.publish({
      destination: `/pub/game/${param.roomId}/spotlight`,
      body: JSON.stringify({
        roomId: param.roomId,
      }),
    });
  }

  async function gameStart() {
    await client.current.publish({
      destination: `/pub/game/${param.roomId}/start`,
      // 서버쪽에선 pub 없다고함. pub은 프론트만 붙이고
      body: JSON.stringify({
        roomId: param.roomId,
        // 룸아이디는 무조건 바디에 보내기 간롤ㅈㄷㄱㄱ
      }),
    });
    sendSpotlight();
    // client.current.publish({
    //   destination: `/pub/game/${param.roomId}/spotlight`,
    //   body: JSON.stringify({
    //     roomId: param.roomId,
    //   }),
    // });
  }

  function onClickTimerHandler() {
    setIsStartTimer(true);
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
    pc.ontrack = (e) => {
      console.log('ontrack success');
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

    if (peerConnectionLocalStream) {
      console.log('localstream add');
      peerConnectionLocalStream.getTracks().forEach((track) => {
        pc.addTrack(track, peerConnectionLocalStream);
      });
    } else {
      console.log('no local stream');
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
      cameraBtn.current.innerText = '켜기';
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
      cameraBtn.current.innerText = '끄기';
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
    console.log(stream);
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

  async function getUserMedias() {
    const initialConstrains = {
      video: true,
      audio: true,
    };

    stream = await navigator.mediaDevices.getUserMedia(initialConstrains);

    // setStream((current) => streamInfunction);
    // console.log('stream:', stream);
    // if (!deviceId) {
    //   await getCameras();
    // }
    return stream;
  }

  useEffect(() => {
    if (myNickName === owner) {
      setIsOwner(true);
    }
  }, [isOwner, owner]);
  useEffect(() => {
    socketRef.current = new SockJS('https://api.namoldak.com/signal');
    socketRef.current.onopen = async () => {
      // navigator.mediaDevices
      // .getUserMedia({
      //   video: true,
      //   audio: true,
      // })
      await getUserMedias()
        .then((streamMedia) => {
          if (videoRef.current) {
            videoRef.current.srcObject = streamMedia;

            console.log(streamMedia);
            console.log('stream:', stream);
          }
        })
        .catch((error) => {
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
          console.log('all_user recieve');
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
                  console.log('create offer success');
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
          console.log('get offer');
          createPeerConnection(
            data.sender,
            socketRef.current,
            stream,
            data.senderNickName,
          );
          const offerPc = pcs[`${data.sender}`];
          if (offerPc) {
            offerPc.setRemoteDescription(data.offer).then(() => {
              console.log('answer set remote description success');
              // {offerToReceiveVideo: true,
              // offerToReceiveAudio: true,}  //createAnswer매개변수
              offerPc
                .createAnswer()
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
          const answerPc = pcs[`${data.sender}`];
          if (answerPc) {
            answerPc.setRemoteDescription(data.answer);
          }
          break;
        }
        case 'candidate': {
          console.log('get candidate');
          const candidatePc = pcs[`${data.sender}`];
          if (candidatePc) {
            candidatePc.addIceCandidate(data.candidate).then(() => {
              console.log('candidate add success');
            });
          }
          break;
        }
        case 'leave': {
          console.log('delete', data.sender);
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
        case 'game_start': {
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

  async function leaveRoom() {
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
    <StGameRoomOuter>
      {isStartModalOn && (
        <ToastMessage setToastState={setIsStartModalOn} text="Game Start!" />
      )}
      <StGameRoomHeader>
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
      <StGameRoomMain>
        <StGameTitleAndUserCards>
          <StTitle>
            <h1>{category}</h1>
          </StTitle>
          <StUserCards>
            <StCard>
              Card
              <h4>{myKeyword}</h4>
              <span>{myNickName}님</span>
              <div>
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
              </div>
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
        </StGameTitleAndUserCards>
        <div>
          {isStartTimer && (
            <SpotTimer
              setIsStartTimer={setIsStartTimer}
              setIsMyTurnModal={setIsMyTurnModal}
              // 삼항연산자 사용 (발언권 있는 사람의 경우 스팟타이머, 아니면 그냥 타이머)
            />
          )}
          {isMyTurnModal && (
            <GameModal
              content={
                <GameAnswerModal
                  roomId={roomId}
                  setIsMyTurnModal={setIsMyTurnModal}
                />
              }
            />
          )}
        </div>
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

const Stimg = styled.img`
  display: none;
`;

export default GameRoomRTC;
