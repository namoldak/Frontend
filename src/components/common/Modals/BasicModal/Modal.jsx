// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import ModalPortal from '../ModalPortal';
import modalBack from '../../../../assets/images/modalBack.svg';
import closeBtn from '../../../../assets/images/closeBtn.svg';

function Modal({ onClose, content }) {
  return (
    <ModalPortal>
      <StBackground onClick={onClose}>
        <StModalBorder
          role="presentation"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <StCloseBtn onClick={onClose}>
            <img src={closeBtn} alt="방 닫기" />
          </StCloseBtn>
          <div>{content}</div>
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
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const StModalBorder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${modalBack});
  background-size: cover;
  background-repeat: no-repeat;
  width: 615px;
  height: 453px;
  padding: 40px;
`;

const StCloseBtn = styled.button`
  position: absolute;
  top: 60px;
  right: 70px;
`;
export default Modal;
