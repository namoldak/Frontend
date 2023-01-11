// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Input from '../../Input';
import { removeCookie } from '../../../../utils/cookies';
import { instance } from '../../../../api/core/axios';

function MyPageModal() {
  const [password, setPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  async function onClickDeleteAccount() {
    instance
      .delete(`/auth/deleteMember`, { data: { password } })
      .then((response) => {
        alert(response.data.statusMsg);
        removeCookie('my_token', 'nickname');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          setPassMsg(error.response.data.statusMsg);
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
          window.location.reload();
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
      <Input
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onFocus={(e) => {
          setPassMsg('정말로 가는거닭?');
        }}
      />
      {passMsg}
      <button onClick={onClickDeleteAccount}>탈퇴 진행하기</button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

export default MyPageModal;
