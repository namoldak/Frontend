// 외부 모듈
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import egg from 'assets/images/egg.svg';
import { enterRoom } from 'redux/roomSlice';
import inprogress from 'assets/images/inprogress.svg';
import useToast from 'hooks/useToast';

function Room({ roomInfo }) {
  const dispatch = useDispatch();

  function clickRoom(roomInfo) {
    if (roomInfo.memberCnt >= 4) {
      useToast('꽉 차서 못 들어간닭...', 'warning');
      return null;
    }
    if (roomInfo.status === false) {
      useToast('지금은 끼어들 수 없닭!', 'warning');
      return null;
    }
    setTimeout(function () {
      dispatch(enterRoom(roomInfo));
    }, 500);
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
          <img src={egg} alt="계란 이미지" />
          {roomInfo.status === false ? (
            <StInProgress>
              <img src={inprogress} alt="진행 중" />
            </StInProgress>
          ) : (
            ''
          )}
        </StEgg>
        <StRoomInfo>
          <p>{roomInfo.memberCnt} / 4</p>
        </StRoomInfo>
      </div>
    </StRoomCardBox>
  );
}

export default Room;

const StRoomCardBox = styled.div`
  ${({ theme }) => theme.common.flexCenter}
`;

const StRoomTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  ${({ theme }) => theme.colors.text2}
`;

const StEgg = styled.div`
  position: relative;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 150px;
  height: 200px;
  cursor: pointer;
`;

const StRoomInfo = styled.div`
  background: ${({ theme }) => theme.colors.lightBeige};
  width: 68px;
  height: 37px;
  border-radius: 10px;
  margin: 0 auto;

  p {
    font-size: 18px;
    line-height: 21px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    padding-top: 8px;
  }
`;

const StInProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 60px;
`;
