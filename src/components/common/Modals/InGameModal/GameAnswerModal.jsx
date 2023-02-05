// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import skipBtn from 'assets/images/skipBtn.svg';
import okBtn from 'assets/images/okBtn.svg';
import Input from 'components/common/Input/Input';

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
      <StTitle>정 답</StTitle>
      <StTimer>제한 시간 : {seconds} 초</StTimer>
      <Input
        placeholder="정답을 입력해주세요."
        value={answerValue}
        onChange={onInputHandler}
      />
      <StBtnBox>
        <button
          onClick={() => {
            skipAnswer(nickName);
            setIsMyTurnModal(false);
          }}
        >
          <img src={skipBtn} alt="넘기기" className="skip" />
        </button>
        <button
          onClick={() => {
            sendAnswer(answerValue, nickName);
            setIsMyTurnModal(false);
          }}
        >
          <img src={okBtn} alt="제출" className="submit" />
        </button>
      </StBtnBox>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 54px;
  z-index: 900;

  input {
    width: 420px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const StTitle = styled.div`
  font-size: 38px;
  font-weight: 900;
`;

const StTimer = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
  margin-top: 20px;
`;

const StBtnBox = styled.div`
  display: flex;

  .skip {
    width: 184px;
    margin-right: 25px;
  }

  .submit {
    width: 184px;
    margin-left: 25px;
  }
`;

export default GameAnswerModal;
