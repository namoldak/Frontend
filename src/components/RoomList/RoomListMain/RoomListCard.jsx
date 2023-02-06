// 외부 모듈
import React, { useEffect, useRef } from 'react';
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
  /// /// BGM Section
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
    if (!isSearch) {
      dispatch(readAllRooms(page));
    } else {
      dispatch(searchRoom({ keyword, page }));
    }
  }, [page, isSearch]);

  return (
    <StRoomListCardBox>
      <StRoomCon>
        {page > 0 ? (
          <StLeftBtn
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <img src={leftArrow} alt="이전" />
          </StLeftBtn>
        ) : (
          <StEmptyDiv />
        )}
        <StRoomBox>
          {gameRoomResponseDtoList?.length === 0 ? (
            <StNoList>
              <img
                style={{ width: '250px', height: '250px' }}
                src={chickenSurprised}
                alt="글 작성하기"
              />
              <StNoListText>
                아직 아무 방이 없닭! 처음으로 방을 만들어 볼 수 있닭!
              </StNoListText>
            </StNoList>
          ) : (
            gameRoomResponseDtoList?.map((room) => {
              return (
                <div key={room.id}>
                  <Room roomInfo={room} />
                </div>
              );
            })
          )}
        </StRoomBox>
        {page < totalPage - 1 ? (
          <StRightBtn
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <img src={rightArrow} alt="다음" />
          </StRightBtn>
        ) : (
          <StEmptyDiv />
        )}
        <StRefreshBtn onClick={refreshRoomList}>
          <img src={refreshBtn} alt="새로고침" />
        </StRefreshBtn>
      </StRoomCon>
    </StRoomListCardBox>
  );
}

const StRoomListCardBox = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  position: relative;
  height: calc(100vh - 300px);
  background-image: url(${roomListBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  @media ${(props) => props.theme.laptop} {
    height: calc(100vh - 285px);
  }
`;

const StRoomCon = styled.div`
  position: absolute;
  top: 155px;
  /* left: 0; */
  left: 40px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-left: 55px;
  width: 1070px;
  height: 327px;

  @media ${(props) => props.theme.laptop} {
    top: 90px;
    left: 70px;
    width: 850px;
    height: 300px;
  }
`;

const StRoomBox = styled.div`
  max-width: 930px;
  display: flex;
  /* grid-template-columns: repeat(4, 1fr); */
  column-gap: 110px;
`;

const StLeftBtn = styled.button`
  height: 42px;
  margin-right: 40px;
`;

const StRightBtn = styled.button`
  height: 42px;
  margin-left: 40px;
`;

const StEmptyDiv = styled.div`
  /* width: 100%; */
`;

const StRefreshBtn = styled.button`
  height: 20px;
  position: absolute;
  bottom: -68px;
  left: 15px;

  @media ${(props) => props.theme.laptop} {
    bottom: -62px;
    left: -12px;
  }
`;

const StNoList = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  position: relative;
  color: ${({ theme }) => theme.colors.lightBeige};
  font-size: 30px;

  width: auto;
  height: 300px;
`;

const StNoListText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.lightBeige};
  font-size: 20px;
  line-height: 2.5rem;

  width: 100%;
`;
export default RoomListCard;
