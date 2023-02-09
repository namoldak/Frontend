// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { removeCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import Input from 'components/common/Input/Input';
import deleteAccount from 'assets/images/deleteAccount.svg';
import useToast from 'hooks/useToast';

function DeleteAccountModal({ input, setting }) {
  const [password, setPassword] = useState('');

  async function onClickDeleteAccount() {
    if (password === '') {
      useToast('비밀번호를 입력해주세요', 'warning');
    } else if (password !== input) {
      useToast('비밀번호가 일치하지 않습니다', 'warning');
    } else {
      instance
        .delete(`/auth/deleteMember`, { data: { password } })
        .then((response) => {
          removeCookie('my_token', 'nickname');
          useToast(`${response.data.statusMsg}`, 'success');
          setting(false);
          setTimeout(() => {
            window.location.href = `/`;
          }, 1500);
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            useToast(
              '회원가입 시 입력하신 비밀번호와 일치하지 않습니다.',
              'error',
            );
          }
        });
    }
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickDeleteAccount();
    }
  }

  return (
    <StDeleteAccountModal onKeyUp={onKeyUpEnter}>
      <StTitle>정말로 가는거닭?...🐓</StTitle>
      <Input
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <StDeleteAccountBtn
        onClick={() => {
          onClickDeleteAccount();
        }}
      >
        <img src={deleteAccount} alt="탈퇴 진행하기" />
      </StDeleteAccountBtn>
    </StDeleteAccountModal>
  );
}

const StDeleteAccountModal = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin-top: 108px;

  input {
    width: 420px;
    margin-top: 23px;
    margin-bottom: 31px;
    font-weight: 200;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.text4};
  }

  input::placeholder {
    font-weight: 200;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.text4};
  }
`;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #${({ theme }) => theme.colors.text};
`;

const StDeleteAccountBtn = styled.button``;

export default DeleteAccountModal;
