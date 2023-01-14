// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button';

// 내부 모듈
import Input from '../../Input';
import { instance } from '../../../../api/core/axios';

function GameAnswerModal(param, { setIsMyTurnModal }) {
  console.log(param);
  // eslint-disable-next-line react/destructuring-assignment
  const gameRoomId = param.gameInfo.roomId;
  console.log('gameRoomId', gameRoomId);
  const [answerValue, setAnswerValue] = useState('');
  const [seconds, setSeconds] = useState(10);

  async function onClickAnswer() {
    const answer = { answer: answerValue };
    console.log('answer', answer);
    await instance.post(`/pub/game/${gameRoomId}/answer`, answer);
  }

  async function onClickSkip() {
    await instance.post(`/pub/game/${gameRoomId}/skip`);
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      onClickAnswer();
    }
  }

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(parseInt(seconds, 10) - 1);
    }, 1000);
    if (parseInt(seconds, 10) === 0) {
      // setIsMyTurnModal(false);
    }
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <StModalContainer onKeyUp={onKeyUpEnter}>
      <StTimeText>제한 시간</StTimeText>
      <LimitTimer>{seconds} 초</LimitTimer>
      <Input
        placeholder="정답을 입력해주세요."
        value={answerValue}
        onChange={(e) => setAnswerValue(e.target.value)}
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
