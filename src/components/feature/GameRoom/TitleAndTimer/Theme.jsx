import React, { useEffect } from 'react';

// 외부모듈
import styled from 'styled-components';

function Theme() {
  return (
    <StTheme>
      <button>방나가기</button>
      <span>방제목</span>
      <span>주제</span>
    </StTheme>
  );
}

export default Theme;

const StTheme = styled.div`
  border: 1px solid blue;
  display: inline-block;
`;
