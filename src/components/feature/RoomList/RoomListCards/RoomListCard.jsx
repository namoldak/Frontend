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

  // useSound(bgm, 0.01);

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  function refreshRoomList() {
    dispatch(readAllRooms(page));
  }

  useEffect(() => {
    dispatch(readAllRooms(page));
  }, [page]);

  return (
    <StRoomListCardBox>
      <StRoomCon>
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
        <StRoomBox>
          {gameRoomResponseDtoList &&
            gameRoomResponseDtoList.map((room) => {
              return (
                <div key={room.id}>
                  <Room roomInfo={room} />
                </div>
              );
            })}
        </StRoomBox>
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
        <StRefreshBtn onClick={refreshRoomList}>
          <img src={refreshBtn} alt="새로고침" />
        </StRefreshBtn>
      </StRoomCon>
    </StRoomListCardBox>
  );
}

const StRoomListCardBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: calc(100vh - 300px);
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StRoomCon = styled.div`
  position: absolute;
  top: 155px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 55px;
  width: 1070px;
  height: 327px;
`;

const StRoomBox = styled.div`
  max-width: 930px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 110px;
`;

const StLeftBtn = styled.button`
  height: 42px;
  margin-right: 40px;
`;

const StRightBtn = styled.button`
  height: 42px;
  margin-left: 40px;
`;

const StEmptyDiv = styled.div`
  width: 100%;
`;

const StRefreshBtn = styled.button`
  height: 20px;
  position: absolute;
  bottom: -68px;
  left: 15px;
`;
export default RoomListCard;
