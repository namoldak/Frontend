// 외부 모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import ModalPortal from './ModalPortal';

function Modal({ onClose, content }) {
  // 모달창 여닫는 함수, 모달 내용 props
  useEffect(() => {
    // 모달창 생기면 스크롤 안되게 하는 부분
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      // 모달 해제되면 스크롤 다시 가능하게 만들기 = style 부분 초기화
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalPortal>
      <StBackground onClick={onClose}>
        <StModalBorder>
          <div>
            <button onClick={onClose}>X</button>
          </div>
          <div>
            <div>{content}</div>
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
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const StModalBorder = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Modal;
