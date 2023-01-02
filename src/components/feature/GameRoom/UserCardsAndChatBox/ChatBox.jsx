import React, { useEffect } from 'react';
//내부모듈
import InputChat from './InputChat';
import ChatScreen from './ChatScreen';
//외부모듈
import styled from 'styled-components';

function ChatBox() {
  return (
    <StChatBox>
      <ChatScreen />
      <InputChat />
    </StChatBox>
  );
}

export default ChatBox;

const StChatBox = styled.div`
  border: 2px solid red;
  display: grid;
  grid-template-rows: 500px 1fr;
`;
