// 외부모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Timer({ setIsStartTimer }) {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds, 10) > 0) {
        setSeconds(parseInt(seconds, 10) - 1);
      }
      return () => clearInterval(countdown);
    }, 1000);
  }, [seconds]);

  const timerOut = setTimeout(() => {
    setIsStartTimer(false);
  }, 20000);

  clearTimeout(timerOut);

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