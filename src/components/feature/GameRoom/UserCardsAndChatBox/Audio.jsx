import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import duckImg from '../../../../assets/images/duck.jpg';

function Audio({ stream, nickName, isCameraOn, keyword }) {
  const videoRef = useRef(null);
  const userCardImgRef = useRef(null);
  const [userkeyword, setUserKeyword] = useState('키워드');
  const [userList, setUserList] = useState('');

  function cameraOnHandler() {
    if (isCameraOn === true) {
      videoRef.current.style.display = 'block';
      userCardImgRef.current.style.display = 'none';
    } else {
      videoRef.current.style.display = 'none';
      userCardImgRef.current.style.display = 'block';
    }
  }

  useEffect(() => {
    cameraOnHandler();
  }, [isCameraOn]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setUserKeyword(keyword[`${nickName}`]);
  }, [stream, keyword]);

  return (
    <>
      Card
      <h4>{userkeyword}</h4>
      <span>{nickName}님</span>
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
        <Stimg
          ref={userCardImgRef}
          src={duckImg}
          alt=""
          width={200}
          height={200}
        />
      </div>
    </>
  );
}

export default Audio;

const Stimg = styled.img``;
