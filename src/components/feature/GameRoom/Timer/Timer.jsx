// 외부모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부모듈
import clock from 'assets/images/clock.png';

function Timer({ setIsTimer }) {
  const [seconds, setSeconds] = useState(30);

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
      <StTimerText>
        <span>{seconds} 초</span>
      </StTimerText>
    </StTimer>
  );
}

export default Timer;

const StTimer = styled.div`
  position: relative;
`;

const StTimerText = styled.div`
  position: absolute;
  top: -35px;
  right: 0px;
  background: url(${clock});
  background-repeat: no-repeat;
  width: 282px;
  height: 323px;
  margin-right: 137px;

  span {
    position: absolute;
    top: 115px;
    left: 96px;
    font-size: 40px;
    font-weight: 600;
    color: #5d3714;
  }
`;
