// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms } from '../../../../redux/modules/roomSlice';
import Room from './Room';
import useSound from '../../../../hooks/useSound';
import bgm from '../../../../assets/audio/bg.mp3';
import roomListBanner from '../../../../assets/images/roomListBanner.svg';
import leftArrow from '../../../../assets/images/leftArrow.svg';
import rightArrow from '../../../../assets/images/rightArrow.svg';
import refreshBtn from '../../../../assets/images/refreshBtn.svg';

function RoomListCard() {
  const { totalPage, gameRoomResponseDtoList } = useSelector(
    (state) => state.rooms.rooms,
  );

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const dispatch = useDispatch();

  // useSound(bgm, 0.1, 2000);

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
  position: relative;
  width: 1180px;
  height: calc(100vh - 260px);
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  padding-top: 10%;
`;

const StRoomCon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  margin: 0 auto;
`;

const StRoomBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 60px;
  place-items: center;
`;

const StLeftBtn = styled.button`
  height: 40px;
  margin-left: 100px;
`;

const StRightBtn = styled.button`
  height: 40px;
  margin-right: 100px;
`;

const StEmptyDiv = styled.div``;

const StRefreshBtn = styled.button`
  position: absolute;
  left: 120px;
  bottom: 0;
  color: white;
  font-size: 22px;
  font-weight: 500;
`;
export default RoomListCard;
