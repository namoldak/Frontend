// 외부 모듈
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Howl, Howler } from 'howler';
import { createBrowserHistory } from 'history';

// 내부 모듈
import { readAllRooms, searchRoom } from 'redux/roomSlice';
import bgm from 'assets/audio/bg.mp3';
import roomListBanner from 'assets/images/roomListBanner.svg';
import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';
import refreshBtn from 'assets/images/refreshBtn.svg';
import chickenSurprised from 'assets/images/chickenSurprised.svg';
import Room from './Room';

function RoomListCard({ page, setPage, keyword, isSearch }) {
  const { totalPage, gameRoomResponseDtoList } = useSelector(
    (state) => state.rooms.rooms,
  );

  const dispatch = useDispatch();

  function refreshRoomList() {
    dispatch(readAllRooms(page));
  }
  // BGM Section
  const range = useSelector((state) => state.bgmVolume.volume);

  const sound = new Howl({
    src: [bgm],
    loop: true,
    volume: 1,
  });
  const soundStop = () => sound.stop();

  useEffect(() => {
    sound.play();
  }, []);

  useEffect(() => {
    sound.on('play', () => {
      const history = createBrowserHistory();
      history.listen(({ action }) => {
        if (action === 'POP') {
          sound.stop();
        }
      });
    });
    return soundStop;
  }, []);

  useEffect(() => {
    if (range) {
      if (range === 0) {
        sound.mute();
      } else {
        Howler.volume(range);
      }
    }
  }, [sound, range]);

  useEffect(() => {
    if (keyword === '') {
      dispatch(readAllRooms(page));
    } else if (keyword !== '') {
      dispatch(searchRoom({ keyword, page }));
    }
  }, [page, isSearch]);

  return (
    <StRoomListCard>
      {page > 0 && (
        <StLeftBtn
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <img src={leftArrow} alt="이전" />
        </StLeftBtn>
      )}
      <StRoomBox>
        {gameRoomResponseDtoList?.map((room) => {
          return (
            <div key={room.id}>
              <Room roomInfo={room} />
            </div>
          );
        })}
      </StRoomBox>
      {page < totalPage - 1 && (
        <StRightBtn
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <img src={rightArrow} alt="다음" />
        </StRightBtn>
      )}
      {gameRoomResponseDtoList?.length === 0 && (
        <StNoList>
          <img
            style={{ width: '154px', height: '218px' }}
            src={chickenSurprised}
            alt="글 작성하기"
          />
          <StNoListText>아무것도 없닭...🐓</StNoListText>
        </StNoList>
      )}
      <StRefreshBtn onClick={refreshRoomList}>
        <img src={refreshBtn} alt="새로고침" />
      </StRefreshBtn>
    </StRoomListCard>
  );
}

const StRoomListCard = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 1180px;
  min-height: 680px;
  margin: 0 auto;
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${(props) => props.theme.laptop} {
    min-width: 1000px;
    min-height: 532px;
  }
`;

const StRoomBox = styled.div`
  display: grid;
  min-width: 900px;
  ${({ theme }) => theme.common.absoluteCenter}
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  padding-bottom: 40px;

  @media ${(props) => props.theme.laptop} {
    min-width: 770px;
    padding-bottom: 20px;
  }
`;

const StLeftBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 42px;
`;

const StRightBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 42px;
`;

const StRefreshBtn = styled.button`
  height: 20px;
  position: absolute;
  bottom: 130px;
  left: 70px;

  @media ${(props) => props.theme.laptop} {
    bottom: 100px;
    left: 90px;
  }
`;

const StNoList = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

const StNoListText = styled.div`
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default RoomListCard;
