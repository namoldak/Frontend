// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms } from '../../../../redux/modules/roomSlice';
import leftArrow from '../../../../assets/img/leftArrow.png';
import rightArrow from '../../../../assets/img/rightArrow.png';
import Room from './Room';

function RoomListCard() {
  const rooms = useSelector((state) => state.rooms.rooms);
  // console.log('rooms 전역', rooms);

  const startPage = 0;
  const [page, setPage] = useState(startPage);
  const [limit, setLimit] = useState(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <StRoomListCard>
      <StRoomListCardBox>
        {!rooms.length ? (
          <div>
            <StLeftArrowBox
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <PrevBtn>
                {page > 0 ? <img src={leftArrow} alt="leftArrow icone" /> : ''}
              </PrevBtn>
            </StLeftArrowBox>
            <span>아무것도 없닭...</span>
            <StRightArrowBox
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <NextBtn>
                <img src={rightArrow} alt="rightArrow icon" />
              </NextBtn>
            </StRightArrowBox>
          </div>
        ) : (
          <div>
            <StLeftArrowBox
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <PrevBtn>
                {page > 0 ? <img src={leftArrow} alt="leftArrow icone" /> : ''}
              </PrevBtn>
            </StLeftArrowBox>
            {rooms.slice(0, 4).map((room) => {
              return (
                <RoomInfo key={room.id}>
                  <Room roomInfo={room} />
                </RoomInfo>
              );
            })}
            <StRightArrowBox
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <NextBtn>
                <img src={rightArrow} alt="rightArrow icon" />
              </NextBtn>
            </StRightArrowBox>
          </div>
        )}
      </StRoomListCardBox>
    </StRoomListCard>
  );
}

const StRoomListCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StRoomListCardBox = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;

  width: fit-content;
  height: fit-content;
`;

const PrevBtn = styled.div`
  border: 0;
  background: none;
  cursor: pointer;
`;

const StLeftArrowBox = styled.div`
  img {
    height: 100px;
  }
`;

const NextBtn = styled.div`
  border: 0;
  background: none;
  cursor: pointer;
`;

const StRightArrowBox = styled.div`
  img {
    height: 100px;
    transform: rotate(180deg);
  }
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 400px;
  height: 400px;

  margin: auto;
  /* position: absolute;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 22px;
  font-weight: bold; */
`;

const UserCount = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const CountSlash = styled.div`
  position: absolute;
  top: 18px;
  left: 26px;
  transform: rotate(22deg);
`;

const UserMaxCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export default RoomListCard;
