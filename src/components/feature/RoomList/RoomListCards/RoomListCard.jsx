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
  const rooms = useSelector((state) => state.rooms.rooms);

  const startPage = 0;
  const [page, setPage] = useState(startPage);
  const [limit, setLimit] = useState(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <StRoomListCardBox>
      {!rooms.length ? (
        <StTetDiv>
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
          <StEmptyDiv />
          <StRightImg
            width="100px"
            src={rightArrow}
            alt="rightArrow icon"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </StTetDiv>
      ) : (
        <StTetDiv>
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

          <StRightImg
            width="100px"
            src={rightArrow}
            alt="rightArrow icon"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </StTetDiv>
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
`;
const StRightImg = styled.img`
  transform: rotate(180deg);
  cursor: pointer;
`;
const RoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: auto;
`;

const StTetDiv = styled.div`
  display: grid;
  border: 1px solid black;
  grid-template-columns: 100px 1fr 1fr 1fr 1fr 100px;
  max-width: 100%;
  column-gap: 40px;
  place-items: center;
`;

const StEmptyDiv = styled.div`
  padding: 50px;
`;

export default RoomListCard;
