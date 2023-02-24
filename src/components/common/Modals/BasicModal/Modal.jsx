// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import modalBack from 'assets/images/modalBack.svg';
import closeBtn from 'assets/images/closeBtn.svg';
import ModalPortal from '../ModalPortal';

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
  ${({ theme }) => theme.common.modalBack}
`;

const StModalBorder = styled.div`
  ${({ theme }) => theme.common.absoluteCenter}
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
