// 외부 모듈
import React, { useState } from 'react';

// 내부 모듈
import ruleBtn from 'assets/images/ruleBtn.svg';
import GameRuleModal from 'components/common/Modals/BasicModal/GameRuleModal';
import RuleModal from 'components/common/Modals/BasicModal/RuleModal';

function GameRule() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <>
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
        <img src={ruleBtn} alt="게임 룰" />
      </button>
    </>
  );
}

export default GameRule;
