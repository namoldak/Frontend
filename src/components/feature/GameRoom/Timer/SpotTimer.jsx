// 외부모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function SpotTimer({ setIsSpotTimer, setIsMyTurnModal }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(parseInt(seconds, 10) - 1);
    }, 1000);
    if (parseInt(seconds, 10) === 0) {
      setIsSpotTimer(false);
      setIsMyTurnModal(true);
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

export default SpotTimer;

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