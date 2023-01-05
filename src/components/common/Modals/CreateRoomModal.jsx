// 외부 모듈
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import { createRoom } from '../../../redux/modules/roomSlice';

function CreateRoomModal() {
  const [gameRoomName, setGameRoomName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickRoomCreate() {
    const newRoom = { gameRoomName, gameRoomPassword: '1234' };
    console.log('newRoom', newRoom);
    if (gameRoomName === '') {
      alert('제목을 입력해주세요');
    } else {
      dispatch(createRoom(newRoom));
      setGameRoomName('');
    }
  }

  return (
    <StModalContainer>
      <input
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
