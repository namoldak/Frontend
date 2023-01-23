// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import { getCookie } from 'utils/cookies';
import closeBtn from 'assets/images/closeBtn.svg';
import landingToGameBtn from 'assets/images/landingToGameBtn.svg';
import landingBack from 'assets/images/landingBack.svg';
import landingToLoginBtn from 'assets/images/landingToLoginBtn.svg';
import ModalPortal from '../ModalPortal';

function RuleModal({ onClose, content }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getCookie('my_token')) {
      setIsLoggedIn(true);
    }
  }, [getCookie]);

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
          <StRuleText>{content}</StRuleText>
          <StToGo>
            {isLoggedIn ? (
              <Link to="/rooms">
                <img src={landingToGameBtn} alt="게임하러가기" />
              </Link>
            ) : (
              <Link to="/login">
                <img src={landingToLoginBtn} alt="로그인하러가기" />
              </Link>
            )}
          </StToGo>
        </StModalBorder>
      </StBackground>
    </ModalPortal>
  );
}

const StBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StModalBorder = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1180px;
  height: 750px;
  background-image: url(${landingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const StCloseBtn = styled.button`
  position: absolute;
  top: 50px;
  right: 110px;
  width: 60px;
`;

const StRuleText = styled.div`
  ${({ theme }) => theme.common.absoluteCenter}
  padding-bottom: 50px
`;

const StToGo = styled.button`
  width: 485px;
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
`;

export default RuleModal;
