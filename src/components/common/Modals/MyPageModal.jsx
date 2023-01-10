// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import Input from '../Input';
import authAPI from '../../../api/authAsync';
import { getNicknameCookie } from '../../../utils/cookies';

function MyPageModal() {
  const [password, setPassword] = useState('');
  const nickname = getNicknameCookie('nickname');

  async function onClickDeleteAccount() {
    console.log('userInfo', { nickname, password });
    await authAPI.deleteAccount({ nickname, password }).then((response) => {
      console.log('response', response);
      alert(response.data.msg);
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
