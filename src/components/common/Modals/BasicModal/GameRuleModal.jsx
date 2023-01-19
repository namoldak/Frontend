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
  margin-top: 10px;
  background: rgba(4, 2, 0, 0.85);
  border-radius: 30px;

  width: 750px;
  height: 400px;

  gap: 30px;
`;

export default GameRuleModal;
