// 내부모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserCards from './UserCards';
import ChatBox from './ChatBox';
// 외부모듈

function UserCardsAndChatBox() {
  return (
    <StUserCardsAndChatBox>
      <UserCards />
      <ChatBox />
    </StUserCardsAndChatBox>
  );
}

const StUserCardsAndChatBox = styled.div`
  border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default UserCardsAndChatBox;
