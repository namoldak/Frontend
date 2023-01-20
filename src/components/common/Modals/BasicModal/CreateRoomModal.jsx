// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import { createRoom } from '../../../../redux/modules/roomSlice';
import Input from '../../Input';
import modalCreateBtn from '../../../../assets/images/modalCreateBtn.svg';

function CreateRoomModal() {
  const [gameRoomName, setGameRoomName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickRoomCreate() {
    const newRoom = { gameRoomName, gameRoomPassword: '1234' };
    if (gameRoomName.trim() === '') {
      alert('제목을 입력해주세요');
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
        maxLength={15}
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
