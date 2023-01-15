import React from 'react';
import styled from 'styled-components';
// 내부 이미지
import kakao from '../../../assets/img/kakaoLoginLarge.png';

function KaKaoBtn() {
  return (
    <KakaoBox>
      <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
        <img src={kakao} alt="kakao login" />
      </a>
    </KakaoBox>
  );
}

const KakaoBox = styled.div`
  width: 300px;
  img {
    width: 100%;
  }
`;

export default KaKaoBtn;
