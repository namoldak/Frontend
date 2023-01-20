// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import rule from '../../../../assets/images/rule.svg';
import ruletitle from '../../../../assets/images/ruletitle.svg';

function GameRuleModal() {
  return (
    <StModalContainer>
      <div>
        <img src={ruletitle} alt="game rule title" />
      </div>
      <div>
        <img src={rule} alt="game rule" />
      </div>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  /* margin-top: 10px; */
  background: rgba(0, 0, 0, 0.7);
  border-radius: 30px;

  width: 800px;
  height: 440px;

  gap: 50px;
`;

export default GameRuleModal;
