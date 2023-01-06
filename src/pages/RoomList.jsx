// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import RoomListHeaderLayout from '../components/feature/RoomList/RoomListHeader/RoomListHeaderLayout';
import RoomListCard from '../components/feature/RoomList/RoomListCards/RoomListCard';

function RoomList() {
  return (
    <StRoomList>
      <RoomListHeaderLayout />
      <RoomListCard />
    </StRoomList>
  );
}

const StRoomList = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100%;
  max-height: 1080px;
  padding: 40px;
  margin: 0 auto;
  border: 1px solid #000;
`;

export default RoomList;
