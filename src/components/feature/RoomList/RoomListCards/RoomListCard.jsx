// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

// 내부 모듈
import test from '../../../../assets/img/test.png';
import { readAllRooms } from '../../../../redux/modules/roomSlice';

function RoomListCard() {
  const { rooms, roomPage } = useSelector((state) => state.rooms);
  console.log('rooms 전역 상태', rooms);
  console.log('page 전역 상태', roomPage);

  const initalPage = 1;
  const [page, setpage] = useState(initalPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllRooms({ page }));
  }, [dispatch, page]);

  return (
    <StRoomListCard>
      <StRoomListCardCon>
        <StRoomListCardBox>
          {rooms.map((room) => {
            return (
              <div key={room.roomId}>
                <Title>{room.roomName}</Title>
                <ImageBox>
                  <img src={test} alt="test" />
                  <RoomInfo>
                    <UserCount>3</UserCount>
                    <CountSlash>/</CountSlash>
                    <UserMaxCount>4</UserMaxCount>
                  </RoomInfo>
                </ImageBox>
              </div>
            );
          })}
        </StRoomListCardBox>
      </StRoomListCardCon>
    </StRoomListCard>
  );
}

const StRoomListCard = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;

const StRoomListCardCon = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 700px;
  height: 400px;
  border: 1px solid #000;
`;

const StRoomListCardBox = styled.div`
  width: 90%;
  height: 90%;
  align-self: center;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #000;
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
