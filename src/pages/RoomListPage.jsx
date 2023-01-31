// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
// import RoomListHeader from 'components/feature/RoomList/RoomListHeader/RoomListHeader';
import RoomListTopBar from 'components/feature/RoomList/RoomListHeader/RoomListTopBar';
import SearchRoom from 'components/feature/RoomList/RoomListHeader/SearchRoom';
import CreateRoom from 'components/feature/RoomList/RoomListHeader/CreateRoom';
import RoomListCard from 'components/feature/RoomList/RoomListCards/RoomListCard';

function RoomListPage() {
  const [page, setPage] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState('');
  return (
    <StRoomList>
      <StRoomListHeader>
        <RoomListTopBar />
        <StRoomListHeaderBox>
          <SearchRoom
            keyword={keyword}
            setKeyword={setKeyword}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
            page={page}
            setPage={setPage}
          />
          <CreateRoom />
        </StRoomListHeaderBox>
      </StRoomListHeader>
      <RoomListCard
        keyword={keyword}
        setKeyword={setKeyword}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        page={page}
        setPage={setPage}
      />
    </StRoomList>
  );
}

const StRoomList = styled.div`
  /* padding-top: 100px; */
  padding-top: 85px;
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
