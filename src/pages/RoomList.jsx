import React from 'react';
import styled from 'styled-components';
import RoomListHeaderLayout from '../components/feature/RoomList/RoomListHeader/RoomListHeaderLayout';
import RoomListSliderLayout from '../components/feature/RoomList/RoomListSlider/RoomListSliderLayout';
import RoomListCardLayout from '../components/feature/RoomList/RoomListCards/RoomListCardLayout';

function RoomList() {
  return (
    <StRoomList>
      <RoomListHeaderLayout />
      <RoomListCardLayout />
      <RoomListSliderLayout />
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
