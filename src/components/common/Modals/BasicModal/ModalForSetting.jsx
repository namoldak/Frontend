// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import settingBack from 'assets/images/settingBack.png';
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
  ${({ theme }) => theme.common.absoluteCenter};
  background-image: url(${settingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  width: 1149px;
  height: 677px;
  margin-top: 65px;

  @media ${(props) => props.theme.laptop} {
    margin-top: 0;
  }
`;

const StCloseBtn = styled.button`
  position: absolute;
  top: 66px;
  right: 90px;
  width: 60px;
`;
export default ModalForSetting;
