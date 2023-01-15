// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button';

// 내부 모듈
import Input from '../../Input';
import { instance } from '../../../../api/core/axios';

function GameAnswerModal({ roomId, setIsMyTurnModal }) {
  const [answerValue, setAnswerValue] = useState('');
  const [seconds, setSeconds] = useState(10);

  function onInputHandler(event) {
    setAnswerValue(event.target.value);
  }

  async function onClickAnswer() {
    const answer = answerValue;
    await instance.post(`/pub/game/${roomId}/answer`, answer);
  }

  async function onClickSkip() {
    await instance.post(`/pub/game/${roomId}/skip`);
  }

  // function onKeyUpEnter(event) {
  //   if (event.keyCode === 13) {
  //     onClickAnswer();
  //   }
  // }

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(parseInt(seconds, 10) - 1);
    }, 1000);
    if (parseInt(seconds, 10) === 0) {
      setIsMyTurnModal(false);
    }
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    // <StModalContainer onKeyUp={onKeyUpEnter}>
    <StModalContainer>
      <StTimeText>제한 시간</StTimeText>
      <LimitTimer>{seconds} 초</LimitTimer>
      <Input
        placeholder="정답을 입력해주세요."
        value={answerValue}
        onChange={onInputHandler}
      />
      <Button onClick={onClickSkip}>SKIP</Button>
      <Button onClick={onClickAnswer}>ANSWER</Button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

const StTimeText = styled.div``;
const LimitTimer = styled.div``;

export default GameAnswerModal;
