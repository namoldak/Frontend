/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import egg from '../../../../assets/images/egg.svg';
import { enterRoom } from '../../../../redux/modules/roomSlice';
import inprogress from '../../../../assets/images/inprogress.svg';
import useToast from '../../../../hooks/useToast';

function Room({ roomInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clickRoom(roomInfo) {
    if (roomInfo.member.length >= 4) {
      useToast('꽉 차서 못 들어간닭...', 'warning');
      return null;
    }
    if (roomInfo.status === 'false') {
      useToast('지금은 끼어들 수 없닭!', 'warning');
      return null;
    }
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
          {roomInfo.status === 'false' ? (
            <StInProgress>
              <img src={inprogress} alt="game in progress" />
            </StInProgress>
          ) : (
            ''
          )}
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
  position: relative;
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

const StInProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 60px;
`;
