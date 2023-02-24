// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import modalBack from 'assets/images/modalBack.svg';
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
  ${({ theme }) => theme.common.modalBack}
`;

const StModalBorder = styled.div`
  ${({ theme }) => theme.common.absoluteCenter}
  background-image: url(${modalBack});
  background-size: cover;
  background-repeat: no-repeat;
  width: 615px;
  height: 453px;
  padding: 30px;
`;

export default GameModal;
