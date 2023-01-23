/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { removeCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';

function AccountTab() {
  const [password, setPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  async function onClickDeleteAccount() {
    instance
      .delete(`/auth/deleteMember`, { data: { password } })
      .then((response) => {
        removeCookie('my_token', 'nickname');
        setPassMsg(response.data.statusMsg);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          setPassMsg(error.response.data.statusMsg);
        } else {
          setPassMsg('오류가 발생했습니다. 다시 시도해주세요.');
        }
      });
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickDeleteAccount();
    }
  }

  return (
    <StModalContainer onKeyUp={onKeyUpEnter}>
      <StInputCon>
        <input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onFocus={() => {
            setPassMsg('정말로 가는거닭?');
          }}
          onBlur={() => {
            setPassMsg('');
          }}
        />
      </StInputCon>
      <div style={{ height: '30px' }}>{passMsg}</div>
      <button onClick={onClickDeleteAccount}>탈퇴 진행하기</button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
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

const StInputCon = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  input {
    width: 400px;
    height: 54px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 32px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;
export default AccountTab;
