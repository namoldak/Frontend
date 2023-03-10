/* eslint-disable func-names */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';

// 내부 모듈
import { getKakaoToken, getNicknameCookie, removeCookie } from 'utils/cookies';
import deleteAccount from 'assets/images/deleteAccount.svg';
import useToast from 'hooks/useToast';
import { instance } from 'api/core/axios';

function DeleteKaKaoAccountModal({ setting }) {
  const navigate = useNavigate();
  async function onClickDeleteKakaoAccount() {
    const kakao = getKakaoToken('KakaoToken');
    const nickname = getNicknameCookie('nickname');
    const url = `https://kapi.kakao.com/v1/user/unlink`;
    const config = {
      headers: {
        Authorization: `Bearer ${kakao}`,
      },
    };
    try {
      await axios.post(url, null, config).then(() => {
        instance
          .delete(`/auth/deleteKakaoMember`, { data: { nickname } })
          .then(() => {
            useToast('다시 돌아올거라 믿는닭...🐓', 'success');
            removeCookie('KakaoToken');
            navigate('/');
          });
      });
    } catch (e) {
      useToast('회원탈퇴에 실패했닭! 다시 시도해야한닭!', 'error');
    }
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
  color: #${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const StLonelyChicken = styled.div`
  margin-bottom: 40px;
  color: #${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const StDeleteAccountBtn = styled.button``;

export default DeleteKaKaoAccountModal;
