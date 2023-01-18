// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button';

// 내부 모듈
import Input from '../../Input';

function GameAnswerModal({
  skipAnswer,
  setIsMyTurnModal,
  sendAnswer,
  nickName,
}) {
  const [answerValue, setAnswerValue] = useState('');
  const [seconds, setSeconds] = useState(20);
  function onInputHandler(event) {
    setAnswerValue(event.target.value);
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      sendAnswer(answerValue, nickName);
      setIsMyTurnModal(false);
    }
  }

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(parseInt(seconds, 10) - 1);
    }, 1000);
    if (parseInt(seconds, 10) === 0) {
      skipAnswer(nickName);
      setIsMyTurnModal(false);
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
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 60px;

  input {
    width: 420px;
    margin-top: 47px;
    margin-bottom: 60px;
  }
`;

const StTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 38px;
  font-weight: 900;
`;

const StNotice = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 20px;
`;

const StBtnBox = styled.div`
  display: flex;
`;

const StSkip = styled.div`
  width: 184px;
  height: 70px;
  margin-right: 25px;
`;

const StAnswer = styled.div`
  width: 184px;
  height: 70px;
  margin-left: 25px;
`;

export default GameAnswerModal;
