import React from 'react';
//내부모듈
import TitleAndTimer from '../components/feature/GameRoom/TitleAndTimer/TitleAndTimer';
import UserCardsAndChatBox from '../components/feature/GameRoom/UserCardsAndChatBox/UserCardsAndChatBox';
//외부모듈
import styled from 'styled-components';

function GameRoom() {
  return (
    <>
      Game Room
      <StGameRoom>
        <TitleAndTimer />
        <UserCardsAndChatBox />
      </StGameRoom>
    </>
  );
}

export default GameRoom;

const StGameRoom = styled.div`
  border: 3px solid black;
  display: grid;
  grid-template-rows: 100px 1fr;
`;
