// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import { createRoom } from '../../../redux/modules/roomSlice';
import Input from '../Input';

function CreateRoomModal() {
  const [gameRoomName, setGameRoomName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickRoomCreate() {
    const newRoom = { gameRoomName, gameRoomPassword: '1234' };
    console.log('newRoom', newRoom);
    if (gameRoomName.trim() === '') {
      alert('제목을 입력해주세요');
    } else {
      dispatch(createRoom(newRoom));
      setGameRoomName('');
    }
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickRoomCreate();
    }
  }

  return (
    <StModalContainer onKeyUp={onKeyUpEnter}>
      <Input
        placeholder="제목을 입력해주세요"
        value={gameRoomName}
        onChange={(e) => {
          setGameRoomName(e.target.value);
        }}
      />
      <button onClick={onClickRoomCreate}>생성하기</button>
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

export default CreateRoomModal;
