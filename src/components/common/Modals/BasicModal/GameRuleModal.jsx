// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import rule from 'assets/images/rule.svg';

function GameRuleModal() {
  return (
    <StModalContainer>
      <StRuleText>
        <img src={rule} alt="게임룰" />
      </StRuleText>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 880px;
  height: 482px;
  background: #040200;
  opacity: 0.8;
  border-radius: 30px;
  gap: 30px;
  color: white;
`;

const StRuleText = styled.div``;

export default GameRuleModal;
