// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import GameAnswerModal from '../../../common/Modals/InGameModal/GameAnswerModal';
import GameModal from '../../../common/Modals/InGameModal/GameModal';

function MyTurn(param) {
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isMyMic, setIsMyMic] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsModalOn(true);
        }}
      >
        modal
      </button>
      {isModalOn && (
        <GameModal content={<GameAnswerModal gameInfo={param} />} />
      )}
    </div>
  );
}

export default MyTurn;
