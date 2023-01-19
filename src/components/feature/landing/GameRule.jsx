// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import ruleBtn from '../../../assets/images/ruleBtn.svg';
import GameRuleModal from '../../common/Modals/BasicModal/GameRuleModal';
import RuleModal from '../../common/Modals/BasicModal/RuleModal';

function GameRule() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <StGameRule>
      {isModalOn && (
        <RuleModal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<GameRuleModal />}
        />
      )}
      <button
        onClick={() => {
          setIsModalOn(true);
        }}
      >
        <img src={ruleBtn} alt="button" />
      </button>
    </StGameRule>
  );
}

const StGameRule = styled.div``;

export default GameRule;
