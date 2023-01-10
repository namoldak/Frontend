// 내부모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Time from './Time';
import Theme from './Theme';
// 외부모듈

function TitleAndTimer() {
  return (
    <StTitleAndTimer>
      <Theme />
      <Time />
    </StTitleAndTimer>
  );
}

const StTitleAndTimer = styled.div`
  border: 2px solid red;
`;

export default TitleAndTimer;
