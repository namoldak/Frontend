// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms } from '../../../../redux/modules/roomSlice';
import roomListBanner from '../../../../assets/images/roomListBanner.svg';
import leftArrow from '../../../../assets/images/leftArrow.svg';
import rightArrow from '../../../../assets/images/rightArrow.svg';
import Room from './Room';
import useSound from '../../../../hooks/useSound';
import bgm from '../../../../assets/audio/bg.mp3';

function RoomListCard() {
  // const rooms = useSelector((state) => state.rooms);
  // // console.log('rooms', rooms);
  const { totalPage, gameRoomResponseDtoList } = useSelector(
    (state) => state.rooms.rooms,
  );
  console.log('gameRoomResponseDtoList', gameRoomResponseDtoList);
  // console.log('totalPage', totalPage);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const dispatch = useDispatch();


  function refreshRoomList() {
    dispatch(readAllRooms({ page, limit }));
  }
  
  // useSound(bgm, 0.2, 2000);

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [page, limit]);

  return (
    <StRoomListCardBox>
      <StRoomDiv>
        {page > 0 ? (
          <StLeftBtn
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <img src={leftArrow} alt="leftArrow icone" />
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
            <img src={rightArrow} alt="rightArrow icon" />
          </StRightBtn>
        ) : (
          <StEmptyDiv />
        )}
      </StRoomDiv>
      <StRefreshBtn onClick={refreshRoomList}>새로고침</StRefreshBtn>
    </StRoomListCardBox>
  );
}

const StRoomListCardBox = styled.div`
  position: relative;
  width: 1180px;
  height: 532px;
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StRoomDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 40px;
  place-items: center;
  /* min-width: 80%; */
  /* max-width: 100%; */
  padding-top: 10%;
`;

const StLeftBtn = styled.button`
  height: 40px;
  margin-left: 100px;
`;

const StRightBtn = styled.button`
  height: 40px;
  margin-right: 100px;
`;

const StEmptyDiv = styled.div`
  /* padding: 50px; */
`;

const StRefreshBtn = styled.button`
  margin-left: 150px;
  margin-top: 30px;
  color: white;
  font-size: 22px;
  font-weight: 500;
`;
export default RoomListCard;
