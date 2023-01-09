// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from '../../../common/Modals/Modal';
import GameAnswerModal from '../../../common/Modals/GameAnswerModal';

function GameRoomChoice(children) {
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
        <Modal
          onClose={() => setIsModalOn(false)}
          content={<GameAnswerModal gameInfo={children} />}
        />
      )}
    </div>
  );
}

export default GameRoomChoice;
