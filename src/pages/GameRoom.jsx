// 내부모듈
import GameRoomAll from '../components/feature/GameRoom/UserCardsAndChatBox/GameRoomAll';

// 외부모듈
import React from 'react';
import styled from 'styled-components';

function GameRoom() {
  return <GameRoomAll />;
}

export default GameRoom;

const StGameRoom = styled.div`
  border: 3px solid black;
  display: grid;
  grid-template-rows: 100px 1fr;
`;
