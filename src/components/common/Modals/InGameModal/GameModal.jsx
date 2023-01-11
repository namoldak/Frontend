// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import ModalPortal from '../ModalPortal';

function GameModal({ content }) {
  return (
    <ModalPortal>
      <StBackground>
        <StModalBorder>
          <div
            role="presentation"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {content}
          </div>
        </StModalBorder>
      </StBackground>
    </ModalPortal>
  );
}

const StBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const StModalBorder = styled.div`
  padding: 20px;
  width: 500px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default GameModal;
