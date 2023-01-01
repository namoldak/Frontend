//외부모듈
import styled from 'styled-components';
import React from 'react';
import { useRef, useEffect } from 'react';
let stream;
function Card() {
  const videoRef = useRef(null);
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
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
      const devices = await navigator.mediaDevices.enumerateDevices();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
        await getCameras();
      } catch (err) {
        console.log(err);
      }
    };
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
      </div>
      <button>방장일 경우 시작버튼?</button>
    </StCard>
  );
}

export default Card;

const StCard = styled.div`
  border: 1px solid green;
`;
