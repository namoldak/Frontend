import React from 'react';
import styled from 'styled-components';

function CreateRoom() {
  return (
    <StCreateRoom>
      <CreateRoomBtn>방 만들기</CreateRoomBtn>
    </StCreateRoom>
  );
}

const StCreateRoom = styled.div``;

const CreateRoomBtn = styled.button`
  font-size: 20px;
  background: none;
  padding: 10px;
  cursor: pointer;
`;

export default CreateRoom;
