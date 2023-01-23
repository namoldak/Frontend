/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import useToast from 'hooks/useToast';
import modalCreateBtn from 'assets/images/modalCreateBtn.svg';
import Input from 'components/common/Input';
import { createRoom } from 'redux/modules/roomSlice';

function CreateRoomModal() {
  const [gameRoomName, setGameRoomName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickRoomCreate() {
    const newRoom = { gameRoomName, gameRoomPassword: '1234' };
    if (gameRoomName.trim() === '') {
      useToast('제목을 입력해주세요', 'warning');
    } else {
      dispatch(createRoom(newRoom));
    }
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickRoomCreate();
    }
  }

  return (
    <StModalContainer onKeyUp={onKeyUpEnter}>
      <StTitle>방 만들기</StTitle>
      <Input
        placeholder="방 제목을 입력해주세요. (최대 10글자)"
        value={gameRoomName}
        onChange={(e) => {
          setGameRoomName(e.target.value);
        }}
      />
      <button onClick={onClickRoomCreate}>
        <img src={modalCreateBtn} alt="방 만들기" />
      </button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 60px;

  input {
    width: 420px;
    margin-top: 47px;
    margin-bottom: 60px;
  }
`;

const StTitle = styled.div`
  font-size: 38px;
  font-weight: 900;
`;

export default CreateRoomModal;
