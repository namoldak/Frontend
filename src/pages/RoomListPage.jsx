// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
// import RoomListHeader from 'components/feature/RoomList/RoomListHeader/RoomListHeader';
import RoomListTopBar from 'components/feature/RoomList/RoomListHeader/RoomListTopBar';
import SearchRoom from 'components/feature/RoomList/RoomListHeader/SearchRoom';
import CreateRoom from 'components/feature/RoomList/RoomListHeader/CreateRoom';
import RoomListCard from 'components/feature/RoomList/RoomListCards/RoomListCard';

function RoomListPage() {
  return (
    <StRoomList>
      <StRoomListHeader>
        <RoomListTopBar />
        <StRoomListHeaderBox>
          <SearchRoom />
          <CreateRoom />
        </StRoomListHeaderBox>
      </StRoomListHeader>
      <RoomListCard />
    </StRoomList>
  );
}

const StRoomList = styled.div`
  padding-top: 100px;
`;

const StRoomListHeader = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StRoomListHeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 34px;
`;

export default RoomListPage;
