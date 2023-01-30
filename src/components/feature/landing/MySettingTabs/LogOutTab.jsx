/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { getNicknameCookie, removeCookie } from 'utils/cookies';
import useToast from 'hooks/useToast';
import logout from 'assets/images/logout.svg';
import { instance } from 'api/core/axios';

function LogOutTab({ setting }) {
  const [createAt, setCreateAt] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const nickname = getNicknameCookie('nickname');
  function onClickLogOut() {
    if (nickname === undefined) {
      useToast('로그인 하지도 않았닭!!');
    } else {
      removeCookie('my_token', 'nickname');
      useToast('재밌었닭!');
      setTimeout(() => {
        window.location.href = `/`;
      }, 2500);
    }
  }

  useEffect(() => {
    instance.get('/auth/myData').then((res) => {
      setCreateAt(res.data.createdAt);
      setMyEmail(res.data.email);
    });
  }, []);
  return (
    <StLogOutTab>
      <StUserInfo>
        <li>계정 : {nickname}님</li>
        <li>가입 이메일 : {myEmail} </li>
        <li>가입일 : {createAt}</li>
      </StUserInfo>
      <hr />
      <StNotice>게임을 로그아웃하시겠습니까?</StNotice>
      <StLogOut
        onClick={() => {
          onClickLogOut();
          setting(false);
        }}
      >
        <img src={logout} alt="로그아웃" />
      </StLogOut>
    </StLogOutTab>
  );
}

const StLogOutTab = styled.div`
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

const StUserInfo = styled.ul`
  li {
    margin-bottom: 24px;
    font-size: 26px;
    line-height: 56px;
  }
`;

const StNotice = styled.div`
  font-size: 26px;
  line-height: 42px;
  margin-top: 32px;
  margin-bottom: 36px;
`;

const StLogOut = styled.button`
  width: 240px;
  display: block;
  margin: 0 auto;
`;

export default LogOutTab;
