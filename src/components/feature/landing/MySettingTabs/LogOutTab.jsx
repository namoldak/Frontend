// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { removeCookie } from '../../../../utils/cookies';
import { instance } from '../../../../api/core/axios';

function LogOutTab(loggedIn) {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  function onClickLogOut() {
    removeCookie('my_token', 'nickname');
    alert('재밌었닭!');
    setIsLoggedIn(false);
  }
  return (
    <StLogoutBtnDiv>
      <button onClick={onClickLogOut}>로그아웃</button>
    </StLogoutBtnDiv>
  );
}

const StLogoutBtnDiv = styled.div`
  position: absolute;
  top: 127px;
  left: 60px;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  outline: none;
  border-radius: 0px 15px 5px 5px;

  width: 450px;
  height: 250px;
`;

export default LogOutTab;
