/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import { getNicknameCookie, removeCookie } from 'utils/cookies';
import useToast from 'hooks/useToast';

function LogOutTab(loggedIn, modalOn) {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const [isSettingModalOn, setIsSettingModalOn] = useState(modalOn);
  const nickname = getNicknameCookie('nickname');
  const navigate = useNavigate;

  function onClickLogOut() {
    if (nickname === undefined) {
      useToast('로그인 하지도 않았닭!!');
    } else {
      removeCookie('my_token', 'nickname');
      useToast('재밌었닭!');
      setIsLoggedIn(false);
      setTimeout(() => {
        setIsSettingModalOn(false);
        window.location.href = `/`;
      }, 2500);
    }
  }

  return (
    <StLogoutBtnDiv>
      <StName>계정</StName>
      <button onClick={onClickLogOut}>로그아웃</button>
    </StLogoutBtnDiv>
  );
}

const StName = styled.div``;

const StLogoutBtnDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 26px;
  line-height: 42px;
  letter-spacing: 0.08em;
`;

export default LogOutTab;
