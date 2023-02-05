/* eslint-disable func-names */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { removeCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import Input from 'components/common/Input';
import deleteAccount from 'assets/images/deleteAccount.svg';
import useToast from 'hooks/useToast';

function DeleteKaKaoAccountModal({ setting }) {
  const [password, setPassword] = useState('');

  async function onClickDeleteKakaoAccount() {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <StDeleteAccountModal>
      <StTitle>나는 우리가 친구라고 생각했닭...</StTitle>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '30px' }}>🐓</span>...
      </div>
      <StLonelyChicken>
        닭은 친구가 없어 힘겨운 나날을 보내게 될 것입니다...
      </StLonelyChicken>
      <StDeleteAccountBtn
        onClick={() => {
          onClickDeleteKakaoAccount();
          setting(false);
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
`;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 30px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #321d07;
  margin-bottom: 20px;
`;

const StLonelyChicken = styled.div`
  margin-bottom: 40px;
  color: #321d07;
  font-size: 18px;
  font-weight: 700;
`;

const StDeleteAccountBtn = styled.button``;

export default DeleteKaKaoAccountModal;
