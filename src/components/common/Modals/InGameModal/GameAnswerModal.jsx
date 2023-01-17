// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button';

// 내부 모듈
import Input from '../../Input';
import { instance } from '../../../../api/core/axios';

function GameAnswerModal({
  skipAnswer,
  setIsMyTurnModal,
  sendAnswer,
  nickName,
}) {
  const [answerValue, setAnswerValue] = useState('');
  const [seconds, setSeconds] = useState(10);
  function onInputHandler(event) {
    setAnswerValue(event.target.value);
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
      <Button
        onClick={() => {
          skipAnswer(nickName);
          setIsMyTurnModal(false);
        }}
      >
        SKIP
      </Button>
      <Button
        onClick={() => {
          sendAnswer(answerValue, nickName);
          setIsMyTurnModal(false);
        }}
      >
        ANSWER
      </Button>
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
