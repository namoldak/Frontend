// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import test from '../../../../assets/img/test.png';

function Room({ roomInfo }) {
  console.log('roomInfo', roomInfo);
  const navigate = useNavigate();

  function enterRoom(roomId) {
    if (roomInfo.member.length === 4) {
      alert('너무 좁아서 못 들어간닭!');
    } else {
      console.log('roomId', roomId);
      navigate(`/gameroom/${roomId}`);
    }
  }

  return (
    <StRoomCardBox>
      <div key={roomInfo.id}>
        <Title>{roomInfo.roomName}</Title>
        <ImageBox
          onClick={() => {
            enterRoom(roomInfo.id);
          }}
        >
          <img src={test} alt="test" />
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
