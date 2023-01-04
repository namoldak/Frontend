// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// 내부 모듈
import test from '../../../../assets/img/test.png';
import { readAllRooms } from '../../../../redux/modules/roomSlice';
import leftArrow from '../../../../assets/img/leftArrow.png';
import rightArrow from '../../../../assets/img/rightArrow.png';

function RoomListCard() {
  const { rooms } = useSelector((state) => state.rooms);

  const max = rooms.length;
  const startPage = 1;
  const [page, setPage] = useState(startPage);
  const [limit, setLimit] = useState(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllRooms({ page, limit }));
  }, [dispatch, page, limit]);

  function enterRoom(roomId) {
    navigate(`/gameroom/${roomId}`);
  }

  return (
    <StRoomListCard>
      <StRoomListCardBox>
        <StLeftArrowBox
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <PrevBtn>
            {page < 1 ? <img src={leftArrow} alt="leftArrow icon" /> : ''}
          </PrevBtn>
        </StLeftArrowBox>
        {rooms.map((room) => {
          return (
            <div key={room.roomId}>
              <Title>{room.roomName}</Title>
              <ImageBox
                onClick={() => {
                  enterRoom(room.roomId);
                }}
              >
                <img src={test} alt="test" />
              </ImageBox>
              <div>{room.member.length}/4</div>
            </div>
          );
        })}
        <StRightArrowBox
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <NextBtn>
            <img src={rightArrow} alt="rigntArrow icon" />
          </NextBtn>
        </StRightArrowBox>
      </StRoomListCardBox>
    </StRoomListCard>
  );
}

const StRoomListCard = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const StRoomListCardBox = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
`;

const Title = styled.div`
  font-size: 26px;
  text-align: center;
  margin-bottom: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 90%;

  img {
    width: 100%;
    height: 100%;
  }
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
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 22px;
  font-weight: bold;
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
