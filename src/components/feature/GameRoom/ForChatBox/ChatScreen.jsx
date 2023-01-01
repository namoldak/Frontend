import React, { useEffect } from "react";
//내부모듈

//외부모듈
import styled from "styled-components";

function ChatScreen() {

    return(
        <StChatScreen>ChatScreen
            <div>
                채팅로그
                <li>안녕하세요</li>
                <li>반가워요!</li>
                <p>
            
                </p>
                <li>OOO 님이 입장하셨습니다.</li>
       
            </div>
            </StChatScreen>
    )
}

export default ChatScreen;

const StChatScreen = styled.div`
    border:  1px solid green;
`