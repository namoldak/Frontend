import React from 'react';
import styled from 'styled-components';
import CreateRoom from './CreateRoom';
import SearchRoom from './SearchRoom';
import RoomListTopBar from './RoomListTopBar';

function RoomListHeaderLayout() {
  return (
    <StRoomListHeader>
      <RoomListTopBar />
      <StRoomListHeaderBox>
        <SearchRoom />
        <CreateRoom />
      </StRoomListHeaderBox>
    </StRoomListHeader>
  );
}

const StRoomListHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const StRoomListHeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export default RoomListHeaderLayout;
