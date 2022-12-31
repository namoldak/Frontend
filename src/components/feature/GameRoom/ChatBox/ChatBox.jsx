import React, { useEffect } from "react";
//내부모듈
import ChatScreen from "./ChatScreen";
import InputChat from "./InputChat";
//외부모듈
import styled from "styled-components";

function ChatBox() {

    return(
        <StChatBox>ChatBox
            <ChatScreen/>
            <InputChat/>
        </StChatBox>
    )
}

export default ChatBox;

const StChatBox = styled.div`
    border:  2px solid red;
    display: grid;
    grid-template-rows: 1fr 1fr;
`