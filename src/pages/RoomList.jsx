// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import RoomListHeader from '../components/feature/RoomList/RoomListHeader/RoomListHeader';
import RoomListCard from '../components/feature/RoomList/RoomListCards/RoomListCard';
import backImg2 from '../assets/images/backImg2.svg';

function RoomList() {
  return (
    <StRoomList>
      <RoomListHeader />
      <RoomListCard />
    </StRoomList>
  );
}

const StRoomList = styled.div``;

export default RoomList;
