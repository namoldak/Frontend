import React, { useEffect } from 'react';

//외부모듈
import styled from 'styled-components';

function Time() {
  return (
    <StTime>
      Time
      <div>
        <p>남은시간 :20초</p>
      </div>
    </StTime>
  );
}

export default Time;

const StTime = styled.div`
  border: 1px solid green;
  display: inline-block;
`;
