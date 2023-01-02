// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { createRoom } from '../../../redux/modules/roomSlice';

function CreateRoomModal() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  function onClickRoomCreate() {
    const newRoom = { title };
    if (title === '') {
      alert('제목을 입력해주세요');
    } else {
      dispatch(createRoom(newRoom));
      setTitle('');
    }
  }

  return (
    <StModalContainer>
      <input
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
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
