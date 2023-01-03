/* eslint-disable no-plusplus */
// 외부모듈
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

function Card() {
  let SockJs = new SockJS('http://sangt.shop/ws/chat');
  let ws = Stomp.over(SockJs);
  let reconnect = 0;
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const param = useParams();
  const [messages, setMessages] = useState([]);
  const messageArray = [];
  let muted = false;
  let cameraOff = false;
  let stream;
  let myPeerConnection;

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

  async function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    if (message.type === 'welcome') {
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      ws.send(
        '/app/chat/message',
        {},
        JSON.stringify({
          type: 'offer',
          offer,
          roomName: param.roomName,
        }),
      );
    } else if (message.type === 'offer') {
      myPeerConnection.setRmoteDescription(message.offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      ws.send(
        '/app/chat/message',
        {},
        JSON.stringify({
          type: 'answer',
          answer,
          roomName: param.roomName,
        }),
      );
    } else if (message.type === 'answer') {
      myPeerConnection.setRemoteDescription(message.answer);
    } else if (message.type === 'ice') {
      myPeerConnection.addICECandidae(message.ice);
    }
    // messageArray.push(message);
    // setMessages([...messageArray]);
  }

  function onConnected(frame) {
    ws.subscribe(`/topic/chat/room/${param.roomName}`, onMessageReceived);
    ws.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        type: 'JOIN',
        roomName: param.roomName,
      }),
    );
  }

  function onError(error) {
    if (reconnect <= 5) {
      // eslint-disable-next-line func-names
      setTimeout(function () {
        console.log('connection reconnect');
        SockJs = new SockJS('/ws/chat');
        ws = Stomp.over(SockJs);
        reconnect++;
        // eslint-disable-next-line no-use-before-define
        roomSubscribe();
      }, 10 * 1000);
    }
  }

  function roomSubscribe(event) {
    ws.connect({}, onConnected(), onError());
    event.preventDefault();
  }

  async function onInputCameraChange() {
    await getUserMedia(camerasSelect.current.value);
  }

  function handleIce(data) {
    ws.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        type: 'ice',
        candidate: data.candidate,
        roomName: param.roomName,
      }),
    );
    console.log('got ice candidate');
    console.log(data);
  }

  function handleAddStream(data) {
    console.log('got an stream from my peer');
    console.log("Peer's Stream", data.stream);
    console.log('My stream', stream);
  }
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    stream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, stream);
    });
  }

  useEffect(() => {
    async function fetchData() {
      await getUserMedia();
      await makeConnection();
      await roomSubscribe();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}

export default Card;

const StCard = styled.div`
  margin: 20px;
  border: 1px solid green;
`;
