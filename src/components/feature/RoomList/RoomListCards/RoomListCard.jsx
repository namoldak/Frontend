// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms } from 'redux/modules/roomSlice';
import useSound from 'hooks/useSound';
import bgm from 'assets/audio/bg.mp3';
import roomListBanner from 'assets/images/roomListBanner.svg';
import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';
import refreshBtn from 'assets/images/refreshBtn.svg';
import Room from './Room';

function RoomListCard() {
  const { totalPage, gameRoomResponseDtoList } = useSelector(
    (state) => state.rooms.rooms,
  );

  // useSound(bgm, 0.1);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const dispatch = useDispatch();

  function refreshRoomList() {
    dispatch(readAllRooms({ page, limit }));
  }

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [page, limit]);

  return (
    <StRoomListCardBox>
      <StRoomCon>
        <StRoomBox>
          {page > 0 ? (
            <StLeftBtn
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <img src={leftArrow} alt="이전" />
            </StLeftBtn>
          ) : (
            <StEmptyDiv />
          )}
          {gameRoomResponseDtoList &&
            gameRoomResponseDtoList.map((room) => {
              return (
                <div key={room.id}>
                  <Room roomInfo={room} />
                </div>
              );
            })}
          {page <= totalPage - 2 ? (
            <StRightBtn
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <img src={rightArrow} alt="다음" />
            </StRightBtn>
          ) : (
            <StEmptyDiv />
          )}
        </StRoomBox>
        <StRefreshBtn onClick={refreshRoomList}>
          <img src={refreshBtn} alt="새로고침" />
        </StRefreshBtn>
      </StRoomCon>
    </StRoomListCardBox>
  );
}

const StRoomListCardBox = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  height: calc(100vh - 300px);
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StRoomCon = styled.div`
  position: relative;
`;

const StRoomBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 110px;
  place-items: center;
`;

const StLeftBtn = styled.button`
  height: 42px;
  margin-left: 56px;
`;

const StRightBtn = styled.button`
  height: 42px;
  margin-right: 56px;
`;

const StEmptyDiv = styled.div`
  height: 300px;
`;

const StRefreshBtn = styled.button`
  height: 20px;
  position: absolute;
  bottom: -34px;
  left: 75px;
`;
export default RoomListCard;
