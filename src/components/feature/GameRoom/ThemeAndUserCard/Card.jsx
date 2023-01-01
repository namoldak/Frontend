//외부모듈
import styled from 'styled-components';
import React from 'react';
import { useRef, useEffect } from 'react';
let stream;
function Card() {
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);
  const cameraOption = useRef(null);
  let muted = false;
  let cameraOff = false;

  function onClickCameraOffHandler() {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!cameraOff) {
      cameraBtn.current.innerText = 'OFF';
      cameraOff = !cameraOff;
    } else {
      cameraBtn.current.innerText = 'ON';
      cameraOff = !cameraOff;
    }
  }
  function onClickMuteHandler() {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
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
      //유저의 장치를 얻어옵니다
      const devices = await navigator.mediaDevices.enumerateDevices();
      //얻어온 유저의 장치들에서 카메라장치만 필터링 합니다
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      //현재내가 사용중인 카메라의 label명을 셀렉트란에 보여주기위한 과정입니다.
      //  아래의 if문과 이어서 확인 해주세요
      const currentCamera = stream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        cameraOption.current.value = camera.deviceId;
        cameraOption.current.innerText = camera.label;
        if (currentCamera.label == camera.label) {
          cameraOption.current.selected = true;
        }
        camerasSelect.current.appendChild(cameraOption.current);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onInputCameraChange() {
    await getUserMedia(camerasSelect.current.value);
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
  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <StCard>
      Card
      <h4>키워드</h4>
      <span>OOO님</span>
      <div>
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
          <option ref={cameraOption} value="device"></option>
        </select>
      </div>
      <button>방장일 경우 시작버튼?</button>
    </StCard>
  );
}

export default Card;

const StCard = styled.div`
  border: 1px solid green;
`;
