// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import Input from '../Input';
import authAPI from '../../../api/authAsync';
import { getNicknameCookie, removeCookie } from '../../../utils/cookies';
import { instance } from '../../../api/core/axios';

function MyPageModal() {
  const [password, setPassword] = useState('');

  function onClickDeleteAccount() {
    const byebye = window.confirm('정말로 가는거닭?');
    if (byebye) {
      instance
        .delete(`/auth/deleteMember`, { data: { password } })
        .then((response) => {
          alert(response.data.statusMsg);
          removeCookie('my_token', 'nickname');
          window.location.reload();
        });
    }
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
      />
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
