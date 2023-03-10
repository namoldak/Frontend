// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 내부 모듈
import { getAccessToken } from 'utils/cookies';
import closeBtn from 'assets/images/closeBtn.svg';
import landingToGameBtn from 'assets/images/landingToGameBtn.svg';
import landingBack from 'assets/images/landingBack.png';
import landingToLoginBtn from 'assets/images/landingToLoginBtn.svg';
import ModalPortal from '../ModalPortal';

function RuleModal({ onClose, content }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (getAccessToken('AccessToken')) {
      setIsLoggedIn(true);
    }
  }, [getAccessToken]);

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
              <img
                role="presentation"
                src={landingToGameBtn}
                onClick={() => {
                  navigate('/rooms');
                }}
                alt="게임하러가기"
              />
            ) : (
              <img
                role="presentation"
                onClick={() => {
                  navigate('/login');
                }}
                src={landingToLoginBtn}
                alt="로그인하러가기"
              />
            )}
          </StToGo>
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
  width: 1180px;
  height: 800px;
  background-image: url(${landingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  margin-top: 46px;

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

const StRuleText = styled.div`
  ${({ theme }) => theme.common.absoluteCenter};
  padding-bottom: 30px;
`;

const StToGo = styled.button`
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
`;

export default RuleModal;
