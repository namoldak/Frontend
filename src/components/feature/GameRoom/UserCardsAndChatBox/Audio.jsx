import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import duckImg from '../../../../assets/images/duck.jpg';
import keywordImg from '../../../../assets/images/keyword.svg';

function Audio({ stream, nickName, isCameraOn, keyword, isMyTurn }) {
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
      {/* <h4>{userkeyword}</h4> */}
      <StVideoBox className={isMyTurn ? 'spotLight' : ''}>
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
      </StVideoBox>
      <StNickName className={isMyTurn ? 'spotLight' : ''}>
        {nickName}님
      </StNickName>
    </>
  );
}

export default Audio;

const StKeywordBack = styled.div`
  background-image: url(${keywordImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 214px;
  height: 53px;
  margin: 10px auto;
`;

const StKeyword = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding-top: 15px;
`;

const StVideoBox = styled.div`
  width: 150px;
  max-width: 150px;
  min-height: 150px;
  margin: 0 auto;
  video {
    width: 100%;
    height: 100%;
  }
`;

const StNickName = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 400;
  color: #5d3714;
  text-align: center;
  border-top: 6px solid #f5c86f;
  padding: 7px 0;
  .spotLight {
    border-top: 6px solid rgba(190, 220, 138, 1);
  }
`;

const Stimg = styled.img``;
