import React from 'react';
import styled from 'styled-components';
import CreateRoom from './CreateRoom';
import SearchRoom from './SearchRoom';
import ToLanding from './ToLanding';

function RoomListHeaderLayout() {
  return (
    <StRoomListHeaderLayout>
      <StRoomListHeaderBox>
        <ToLanding />
        <SearchRoom />
        <CreateRoom />
      </StRoomListHeaderBox>
    </StRoomListHeaderLayout>
  );
}

const StRoomListHeaderLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #000;
`;

const StRoomListHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export default RoomListHeaderLayout;
