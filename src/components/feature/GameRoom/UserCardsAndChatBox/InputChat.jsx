import React, { useEffect } from 'react';
// 내부모듈

// 외부모듈
import styled from 'styled-components';

function InputChat() {
  return (
    <StInputChat>
      InputChat
      <input placeholder="채팅입력란" />
      <button>전송버튼</button>
    </StInputChat>
  );
}

export default InputChat;

const StInputChat = styled.div`
  border: 1px solid green;
`;
