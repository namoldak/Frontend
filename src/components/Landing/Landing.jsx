// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 내부 모듈
import { getAccessToken } from 'utils/cookies';
import landingBack from 'assets/images/landingBack.png';
import landingTitle from 'assets/images/landingTitle.svg';
import landingBanner from 'assets/images/landingBanner.svg';
import landingToGameBtn from 'assets/images/landingToGameBtn.svg';
import landingToLoginBtn from 'assets/images/landingToLoginBtn.svg';
import GameRule from './GameRule';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken('AccessToken')) {
      setIsLoggedIn(true);
    }
  }, [getAccessToken]);

  return (
    <StLanding>
      <StLadingMain>
        <StBanner>
          <StBannerTitle>
            <img src={landingTitle} alt="제목 이미지" />
          </StBannerTitle>
          <StBannerImg>
            <img src={landingBanner} alt="닭 3마리 일러스트" />
          </StBannerImg>
          <StToGo>
            {isLoggedIn ? (
              <img
                role="presentation"
                onClick={() => {
                  navigate('/rooms');
                }}
                src={landingToGameBtn}
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
          <GameRule />
        </StBanner>
      </StLadingMain>
    </StLanding>
  );
}

// header + main
const StLanding = styled.div`
  width: 100%;
  padding-top: 42px;

  @media ${(props) => props.theme.laptop} {
    padding-top: 24px;
  }
`;

// background image 적용
const StLadingMain = styled.div`
  position: relative;
  height: calc(100vh - 84px);
  background-image: url(${landingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  @media ${(props) => props.theme.laptop} {
    height: calc(100vh - 42px);
  }
`;

// 하위 컴포넌트 정렬 위함
const StBanner = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  width: 739px;
  height: 100%;
  margin: 0 auto;
`;

const StBannerTitle = styled.div`
  position: absolute;
  top: -23px;
  left: 187px;

  @media ${(props) => props.theme.laptop} {
    top: -48px;
  }
`;

const StBannerImg = styled.div`
  height: 482px;
  margin-top: 119px;

  @media ${(props) => props.theme.laptop} {
    margin-top: 60px;
  }
`;

const StToGo = styled.button`
  margin-bottom: 15px;
  margin-top: -30px;

  @media ${(props) => props.theme.laptop} {
    margin-top: -50px;
  }
`;

export default Landing;
