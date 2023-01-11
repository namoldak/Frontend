// 외부모듈
import React from 'react';
import styled from 'styled-components';

// 내부모듈
// import GameRoomAll from '../components/feature/GameRoom/UserCardsAndChatBox/GameRoomAll';
// import ConnectTest from '../components/feature/GameRoom/UserCardsAndChatBox/ConnectTest';
// import SignalingTest from '../components/feature/GameRoom/UserCardsAndChatBox/SignalingTest';
import GameRoomRTC from '../components/feature/GameRoom/UserCardsAndChatBox/GameRoomRTC';

function GameRoom() {
  return <GameRoomRTC />;
}

export default GameRoom;

const StGameRoom = styled.div`
  border: 3px solid black;
  display: grid;
  grid-template-rows: 100px 1fr;
`;
