// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms } from '../../../../redux/modules/roomSlice';
import leftArrow from '../../../../assets/img/leftArrow.png';
import rightArrow from '../../../../assets/img/rightArrow.png';
import Room from './Room';

function RoomListCard() {
  const rooms = useSelector((state) => state.rooms.gameRoomResponseDtoList);
  console.log('rooms', rooms);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <StRoomListCardBox>
      {!rooms.length ? (
        <StTestDiv>
          {page > 0 ? (
            <StLeftImg
              width="100px"
              src={leftArrow}
              alt="leftArrow icone"
              onClick={() => {
                setPage(page - 1);
              }}
            />
          ) : (
            <StEmptyDiv />
          )}
          <StEmptyDiv />
          <span>아무것도 없닭...</span>
          <StEmptyDiv />
        </StTestDiv>
      ) : (
        <StTestDiv>
          {page > 0 ? (
            <StLeftImg
              width="100px"
              src={leftArrow}
              alt="leftArrow icone"
              onClick={() => {
                setPage(page - 1);
              }}
            />
          ) : (
            <StEmptyDiv />
          )}
          {rooms.slice(0, 4).map((room) => {
            return (
              <RoomInfo key={room.id}>
                <Room roomInfo={room} />
              </RoomInfo>
            );
          })}
          {page < 5 ? (
            <StRightImg
              width="100px"
              src={rightArrow}
              alt="rightArrow icon"
              onClick={() => {
                setPage(page + 1);
              }}
            />
          ) : (
            <StEmptyDiv />
          )}
        </StTestDiv>
      )}
    </StRoomListCardBox>
  );
}

const StRoomListCardBox = styled.div`
  width: 100%;
`;

const StLeftImg = styled.img`
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
const StRightImg = styled.img`
  display: grid;
  transform: rotate(180deg);
  cursor: pointer;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
const RoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: auto;
`;

const StTestDiv = styled.div`
  display: grid;
  border: 1px solid black;
  /* grid-template-columns: 100px 1fr 1fr 1fr 1fr 100px; */
  grid-template-columns: repeat(6, 1fr);
  max-width: 100%;
  column-gap: 40px;
  place-items: center;
`;

const StEmptyDiv = styled.div`
  padding: 50px;
`;

export default RoomListCard;
