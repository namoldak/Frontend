import React from "react";
//내부모듈
import ThemeAndUserCard from "../components/feature/GameRoom/ThemeAndUserCard/ThemeAndUserCard";
import Timer from "../components/feature/GameRoom/Timer/Timer";
import ChatBox from "../components/feature/GameRoom/ForChatBox/ChatBox";
//외부모듈
import styled from "styled-components";

function GameRoom() {
  return (
    <>
    Game Room
    <StGameRoom>
        <ThemeAndUserCard/>
        <Timer/>
        <ChatBox/>
    </StGameRoom>
    </>
  );
}

export default GameRoom;

const StGameRoom = styled.div`
    border: 3px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`