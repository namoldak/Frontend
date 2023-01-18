// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import egg from '../../../../assets/images/egg.svg';
import { enterRoom } from '../../../../redux/modules/roomSlice';

function Room({ roomInfo }) {
  // console.log('roomInfo', roomInfo);
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
        <StRoomTitle>{roomInfo.roomName}</StRoomTitle>
        <StEgg
          onClick={() => {
            clickRoom(roomInfo);
          }}
        >
          <img src={egg} alt="egg_image" />
        </StEgg>
        <StRoomInfo>
          <p>{roomInfo.member.length} / 4</p>
        </StRoomInfo>
      </div>
    </StRoomCardBox>
  );
}

export default Room;

const StRoomCardBox = styled.div`
  text-align: center;
  margin: auto;
`;

const StRoomTitle = styled.div`
  font-size: 26px;
  ${({ theme }) => theme.colors.text2}
`;

const StEgg = styled.div`
  width: 150px;
  height: 200px;
  margin: 20px 0;
`;

const StRoomInfo = styled.div`
  background: ${({ theme }) => theme.colors.lightBeige};
  width: 68px;
  height: 37px;
  border-radius: 10px;
  margin: 0 auto;

  p {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    padding-top: 10px;
  }
`;
