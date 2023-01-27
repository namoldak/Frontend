// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import settingBack from 'assets/images/settingBack.png';
import closeBtn from 'assets/images/closeBtn.svg';
import ModalPortal from '../ModalPortal';

function ModalForSetting({ onClose, content }) {
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const StModalBorder = styled.div`
  ${({ theme }) => theme.common.absoluteCenter};
  background-image: url(${settingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  width: 1149px;
  height: 677px;
  margin-top: 65px;
`;

const StCloseBtn = styled.button`
  position: absolute;
  top: 66px;
  right: 90px;
  width: 60px;
`;
export default ModalForSetting;
