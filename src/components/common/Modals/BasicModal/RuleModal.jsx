// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import ModalPortal from '../ModalPortal';
import closeBtn from '../../../../assets/images/closeBtn.svg';

function RuleModal({ onClose, content }) {
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
            <img src={closeBtn} alt="방 닫기 버튼" />
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
  z-index: 999;
`;

const StModalBorder = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -55%);
  width: 900px;
  height: 500px;
  padding: 40px;
`;

const StCloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 50px;
`;
export default RuleModal;
