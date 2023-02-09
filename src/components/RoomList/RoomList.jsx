// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import RoomListTopBar from 'components/RoomList/RoomListHeader/RoomListTopBar';
import SearchRoom from 'components/RoomList/RoomListHeader/SearchRoom';
import CreateRoom from 'components/RoomList/RoomListHeader/CreateRoom';
import RoomListCard from 'components/RoomList/RoomListMain/RoomListCard';

function RoomList() {
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
            page={page}
            setPage={setPage}
          />
          <CreateRoom />
        </StRoomListHeaderBox>
      </StRoomListHeader>
      <RoomListCard
        keyword={keyword}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        page={page}
        setPage={setPage}
      />
    </StRoomList>
  );
}

const StRoomList = styled.div`
  padding-top: 85px;
`;

const StRoomListHeader = styled.div`
  width: 100%;
  margin: 0 auto;

  @media ${(props) => props.theme.laptop} {
    width: 940px;
  }
`;

const StRoomListHeaderBox = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexBetween}
  width: 100%;
  margin-top: 34px;
`;

export default RoomList;
