import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import duckImg from '../../../../assets/images/duck.jpg';
import keywordImg from '../../../../assets/images/keyword.svg';
import star from '../../../../assets/images/star.svg';
import playerImg from '../../../../assets/images/playerImg.svg';

function Audio({ stream, nickName, isCameraOn, keyword, isMyTurn, isOwner }) {
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
      <StKeywordBack>
        <StKeyword>{userkeyword || '키워드'}</StKeyword>
      </StKeywordBack>
      {isOwner ? (
        <StStar>
          <img src={star} alt="star" />
        </StStar>
      ) : (
        <div />
      )}
      <StVideoBox>
        <StVideo>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            id="myFace"
            autoPlay
            playsInline
            // width={200}
            // height={200}
          >
            비디오
          </video>
        </StVideo>
        <Stimg
          ref={userCardImgRef}
          src={playerImg}
          alt=""
          // width={200}
          // height={200}
        />
      </StVideoBox>
      <StNickName className={isMyTurn ? 'spotLight' : ''}>
        {nickName}님
      </StNickName>
    </>
  );
}

export default Audio;

const StAudio = styled.div`
  width: 260px;
  height: 274px;
  background-color: #f5f5f5;
  border: 6px solid #f5c86f;
  border-radius: 20px;
  overflow: hidden;

  /* .spotLight {
    background: rgba(103, 138, 41, 1);
    border-color: rgba(147, 191, 69, 1);
    z-index: 2;
  } */
`;

const StKeywordBack = styled.div`
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto 0 auto;
`;

const StKeyword = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding-top: 15px;
`;

const StStar = styled.div`
  position: absolute;
  top: -16%;
  left: -6%;
  height: 60px;
  z-index: 100;
`;

const StVideoBox = styled.div`
  max-width: 150px;
  height: 140px;
  overflow: hidden;
  margin: 0 auto;
`;

const StVideo = styled.div`
  video {
    width: 150px;
    height: 143px;
  }
`;

const StNickName = styled.span`
  display: block;
  height: 50%;
  font-size: 22px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  background: #ffe9bc;
  border-top: 6px solid #f5c86f;
  padding-top: 16px;

  /* .spotLight {
    border-top: 6px solid rgba(190, 220, 138, 1);
  } */
`;

const Stimg = styled.img`
  height: unset;
`;
