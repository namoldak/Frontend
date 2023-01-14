// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import GameAnswerModal from '../../../common/Modals/InGameModal/GameAnswerModal';
import GameModal from '../../../common/Modals/InGameModal/GameModal';

function MyTurn(param, { setIsMyTurnModal }) {
  // const [isMyTurn, setIsMyTurn] = useState(false);
  // const [isMyMic, setIsMyMic] = useState(false);

  return (
    <div>
      <GameModal
        content={
          <GameAnswerModal
            gameInfo={param}
            setIsMyTurnModal={setIsMyTurnModal}
          />
        }
      />
    </div>
  );
}

export default MyTurn;
