import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
// 내부 이미지
import kakao from 'assets/images/kakaoLoginBtn.svg';

function KaKaoBtn() {
  return (
    <KakaoBox>
      <a href={process.env.REACT_APP_KAKAO_AUTH_URL} draggable="false">
        <img src={kakao} alt="카카오 로그인" />
      </a>
    </KakaoBox>
  );
}

const KakaoBox = styled.div`
  width: 181px;
  height: 41px;

  img {
    width: 100%;
  }
`;

export default KaKaoBtn;
