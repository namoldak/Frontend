// 외부모듈
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

// 내부모듈
import { instance } from '../../../../api/core/axios';

function GameRoomAll() {
  const videoRef = useRef(null);
  const anotherVideoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const client = useRef({});

  const navigate = useNavigate();
  const [cookie] = useCookies();
  const param = useParams();

  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  let muted = false;
  let cameraOff = false;
  let stream;
  let myPeerConnection;
  let dataChannel;

  const sender = sessionStorage.getItem('nickname');
  console.log('sender', sender);

  const subscribe = () => {
    client.current.subscribe(
      `/sub/gameroom/${param.roomId}`,
      async ({ body }) => {
        const data = JSON.parse(body);
        // console.log(data);
        switch (data.type) {
          case 'ENTER':
            if (data.sender !== sender) {
              console.log(data);
              const offer = await myPeerConnection.createOffer();
              myPeerConnection.setLocalDescription(offer);
              client.current.publish({
                destination: `/sub/gameroom/${param.roomId}`,
                body: JSON.stringify({
                  type: 'OFFER',
                  roomId: param.roomId,
                  sender,
                  offer,
                }),
              });
              console.log('오퍼전송');
            }
            break;

          case 'OFFER':
            if (data.sender !== sender) {
              console.log('오퍼수신');
              myPeerConnection.setRemoteDescription(data.offer);
              const answer = await myPeerConnection.createAnswer();
              myPeerConnection.setLocalDescription(answer);
              client.current.publish({
                destination: `/sub/gameroom/${param.roomId}`,
                body: JSON.stringify({
                  type: 'ANSWER',
                  roomId: param.roomId,
                  sender,
                  answer,
                }),
              });
              console.log('엔서전송');
            }
            break;
          case 'ANSWER':
            if (data.sender !== sender) {
              console.log('엔서수신');
              myPeerConnection.setRemoteDescription(data.answer);
            }
            break;
          case 'ICE':
            if (data.sender !== sender) {
              console.log('아이스수신');
              myPeerConnection.addIceCandidate(data.ice);
            }
            break;
          default:
        }
      },
    );
  };
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(`http://13.209.84.31:8080/ws-stomp`),
      connectHeaders,
      debug() {},
      onConnect: () => {
        subscribe();
        client.current.publish({
          destination: `/sub/gameroom/${param.roomId}`,
          body: JSON.stringify({
            type: 'ENTER',
            roomId: param.roomId,
            sender,
          }),
        });
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers.message}`);
        console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    client.current.deactivate();
  };
  const leaveRoom = async () => {
    disconnect();
    await instance
      .delete(`rooms/${param.roomId}/exit`)
      .then((res) => {
        navigate('/rooms');
      })
      .catch((error) => {
        alert(error.data.message);
        navigate('/rooms');
      });
  };
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
  }

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

  function handleIce(data) {
    client.current.publish({
      destination: `/sub/gameroom/${param.roomId}`,
      body: JSON.stringify({
        type: 'ICE',
        roomId: param.roomId,
        sender,
        ice: data.candidate,
      }),
    });
    console.log('아이스전송');
  }

  function handleAddStream(data) {
    anotherVideoRef.current.srcObject = data.stream;
    console.log('got an stream from my peer');
    console.log("Peer's Stream", data.stream);
    console.log('My stream', stream);
  }
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    stream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, stream);
    });
  }

  async function fetchData() {
    await getUserMedia();
    await makeConnection();
    await connect();
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StGameRoomOuter>
      <StGameRoomHeader>
        <Link to="/rooms">
          <button>뒤로가기</button>
        </Link>
        <Link to="/rooms">
          <button
            onClick={() => {
              leaveRoom();
            }}
          >
            방나가기
          </button>
        </Link>
        <button>설정</button>
      </StGameRoomHeader>
      <StGameRoomMain>
        <StGameTitleAndUserCards>
          <StTitle>
            <h1>주제</h1>
          </StTitle>
          <StUserCards>
            <StCard>
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
              <button>방장일 경우 시작버튼?</button>
            </StCard>
            <StCard>
              Card
              <h4>키워드</h4>
              <span>OOO님</span>
              <div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={anotherVideoRef}
                  id="myFace"
                  autoPlay
                  playsInline
                  width={200}
                  height={200}
                >
                  비디오
                </video>
              </div>
            </StCard>
          </StUserCards>
        </StGameTitleAndUserCards>
        <StTimer>타이머:남은시간20초</StTimer>
        <StChatBox>
          <StNotice>공지내용</StNotice>
          <StUserChatBox>채팅내용</StUserChatBox>
          <StSendChat>
            <input placeholder="채팅내용" />
            <button>전송</button>
          </StSendChat>
        </StChatBox>
      </StGameRoomMain>
    </StGameRoomOuter>
  );
}

export default GameRoomAll;

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
