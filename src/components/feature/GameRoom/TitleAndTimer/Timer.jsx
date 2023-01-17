// 외부모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Timer({ setIsTimer }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(parseInt(seconds, 10) - 1);
    }, 1000);
    if (parseInt(seconds, 10) === 0) {
      setIsTimer(false);
    }
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <StTimer>
      <StTimerText>남은 시간</StTimerText>
      <GameTimer>{seconds} 초</GameTimer>
    </StTimer>
  );
}

export default Timer;

const StTimer = styled.div`
  border: 1px solid green;
  display: inline-block;
`;

const StTimerText = styled.div`
  font-size: 24px;
`;

const GameTimer = styled.div`
  font-size: 24px;
`;
