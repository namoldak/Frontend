// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';

function BackButton({ url }) {
  const navigate = useNavigate();

  return (
    <StBackBtn
      onClick={() => {
        navigate(url);
      }}
    >
      <img src={backBtn} alt="뒤로 가기" />
    </StBackBtn>
  );
}

const StBackBtn = styled.button`
  height: 78px;
`;

export default BackButton;
