/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { getNicknameCookie, removeCookie } from '../../../../utils/cookies';
import { instance } from '../../../../api/core/axios';
import useToast from '../../../../hooks/useToast';

function LogOutTab(loggedIn) {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const nickname = getNicknameCookie('nickname');

  console.log('nick', nickname);

  function onClickLogOut() {
    if (nickname === undefined) {
      useToast('로그인 하지도 않았닭!!');
    } else {
      removeCookie('my_token', 'nickname');
      useToast('재밌었닭!');
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
