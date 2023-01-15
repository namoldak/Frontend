// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import egg from '../../../../assets/img/egg.svg';
import { enterRoom } from '../../../../redux/modules/roomSlice';

function Room({ roomInfo }) {
  console.log('roomInfo', roomInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  function clickRoom(roomInfo) {
    if (roomInfo.member.length >= 4) {
      alert('꽉 차서 못 들어간닭...');
      return null;
    }
    console.log('enter roominfo', roomInfo);
    dispatch(enterRoom(roomInfo));
    navigate(`/gameroom/${roomInfo.id}`);
  }

  return (
    <StRoomCardBox>
      <div key={roomInfo.id}>
        <Title>{roomInfo.roomName}</Title>
        <ImageBox
          onClick={() => {
            clickRoom(roomInfo);
          }}
        >
          <img src={egg} alt="egg_image" />
        </ImageBox>
        <div>{roomInfo.member.length}/4</div>
      </div>
    </StRoomCardBox>
  );
}

export default Room;

const Title = styled.div`
  font-size: 26px;
  text-align: center;
  margin-bottom: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 40%;
  height: 40%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StRoomCardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: fit-content;

  margin: auto;
`;
