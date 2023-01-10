import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { isBreakOrContinueStatement } from 'typescript';

function SignalingTest() {
  const socketRef = useRef();

  const videoRef = useRef(null);
  const anotherVideoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  const client = useRef({});
  const param = useParams();

  const [users, setUsers] = useState([]);

  let pcs = {};
  let muted = false;
  let cameraOff = false;
  let stream;
  let myPeerConnection;

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
    pcs = { ...pcs, socketID: pc };
    console.log(pcs);
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('onicecandidate');
        socket.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate,
            receiver: socketID,
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

  useEffect(() => {
    socketRef.current = new SockJS(`http://13.209.84.31:8080/signal`);
    socketRef.current.onopen = () => {
      getUserMedia();
      socketRef.current?.send(
        JSON.stringify({ type: 'join_room', roomId: param.roomId }),
      );
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.type);
      switch (data.type) {
        case 'all_users': {
          const { allUsers } = data;
          for (let i = 0; i < allUsers; i += 1) {
            createPeerConnection(allUsers[i].id, socketRef.current, stream);
            const pcId = allUsers[i].id;
            const allUsersEachPc = pcs.pcId;
            const offer = allUsersEachPc.createOffer();
            allUsersEachPc.setLocalDescription(offer);
            socketRef.current?.send(
              JSON.stringify({
                type: 'offer',
                offer,
                receiver: allUsers[i].id,
                roomId: param.roomId,
              }),
            );
          }
          break;
        }
        case 'offer': {
          console.log('get offer');
          createPeerConnection(data.senderId, socketRef.current, stream);
          break;
        }
        default: {
          break;
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>
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
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default SignalingTest;
