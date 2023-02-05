// 외부 모듈
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import keywordImg from 'assets/images/keyword.svg';
import star from 'assets/images/star.svg';
import playerImg from 'assets/images/playerImg.svg';

function Audio({ stream, nickName, isCameraOn, keyword, isMyTurn, isOwner }) {
  const videoRef = useRef(null);
  const userCardImgRef = useRef(null);
  const [userkeyword, setUserKeyword] = useState('키워드');

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
    <StAudio>
      {isMyTurn && (
        <>
          <StCardSpotLight />
          <StNickSpotLight>{nickName}</StNickSpotLight>
        </>
      )}
      <StKeywordBack>
        <StKeyword>{userkeyword || '키워드'}</StKeyword>
      </StKeywordBack>
      {isOwner ? (
        <StStar>
          <img src={star} alt="별" />
        </StStar>
      ) : (
        <div />
      )}
      <StVideoBox>
        <StVideo className={isMyTurn ? 'spotLight' : ''}>
          <video
            className={isMyTurn ? 'spotLight' : ''}
            ref={videoRef}
            id="myFace"
            autoPlay
            playsInline
          >
            비디오
          </video>
        </StVideo>
        <Stimg
          className={isMyTurn ? 'spotLight' : ''}
          ref={userCardImgRef}
          src={playerImg}
          alt="닭 이미지"
        />
      </StVideoBox>
      <StNickName className={isMyTurn ? 'spotLight' : ''}>
        {nickName}
      </StNickName>
    </StAudio>
  );
}

export default Audio;

const StAudio = styled.div`
  /* position: relative; */
`;

const StCardSpotLight = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  width: 261px;
  height: 274px;
  border-radius: 20px;
  background: #76a427;
  border: 6px solid #93bf45;
`;

const StNickSpotLight = styled.div`
  position: absolute;
  bottom: -6px;
  left: -6px;
  width: 260px;
  height: 65px;
  border-radius: 0 0 20px 20px;
  background: #bedc8a;
  border: 6px solid #93bf45;
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  padding-top: 16px;
`;

const StKeywordBack = styled.div`
  position: relative;
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto 0 auto;
`;

const StKeyword = styled.div`
  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  line-height: 24px;
  color: #fff;
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

  .spotLight {
    position: relative;
  }
`;

const StVideo = styled.div`
  video {
    width: 150px;
    height: 143px;

    .spotLight {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
`;

const Stimg = styled.img`
  height: unset;

  .spotLight {
    position: absolute;
    left: 0;
    top: 0;
    height: 200px;
  }
`;

const StNickName = styled.span`
  background: #ffe9bc;
  border-top: 6px solid #f5c86f;
  display: block;
  height: 23%;
  border-radius: 0 0 17px 17px;
  padding-bottom: 17px;

  font-family: MapoBackpacking;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  padding-top: 16px;
`;
