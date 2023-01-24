// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import { getCookie } from 'utils/cookies';
import settingBtn from 'assets/images/settingBtn.svg';
import landingBack from 'assets/images/landingBack.svg';
import landingTitle from 'assets/images/landingTitle.svg';
import landingBanner from 'assets/images/landingBanner.svg';
import landingToGameBtn from 'assets/images/landingToGameBtn.svg';
import landingToLoginBtn from 'assets/images/landingToLoginBtn.svg';
import MyPageModal from 'components/common/Modals/BasicModal/SettingModal';
import Modal from 'components/common/Modals/BasicModal/Modal';
import GameRule from './GameRule';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  useEffect(() => {
    if (getCookie('my_token')) {
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  return (
    <StLanding>
      <StLandingHeader>
        {isSettingModalOn && (
          <Modal
            onClose={() => {
              setIsSettingModalOn(false);
            }}
            content={
              <MyPageModal
                loggedIn={setIsLoggedIn}
                modalOn={setIsSettingModalOn}
              />
            }
          />
        )}
        <StSettingBtn
          onClick={() => {
            setIsSettingModalOn(true);
          }}
        >
          {isLoggedIn ? <img src={settingBtn} alt="설정버튼" /> : ''}
        </StSettingBtn>
      </StLandingHeader>
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
              <Link to="/rooms">
                <img src={landingToGameBtn} alt="게임하러가기" />
              </Link>
            ) : (
              <Link to="/login">
                <img src={landingToLoginBtn} alt="로그인하러가기" />
              </Link>
            )}
          </StToGo>
          <GameRule />
        </StBanner>
      </StLadingMain>
    </StLanding>
  );
}

// header + main
const StLanding = styled.div``;

const StLandingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
  margin-left: auto;
`;

// background image 적용
const StLadingMain = styled.div`
  width: 1180px;
  height: calc(100vh - 120px);
  max-height: 800px;
  background-image: url(${landingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
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
  top: 0;
`;

const StBannerImg = styled.div`
  width: 100%;
  height: 60%;
`;

const StToGo = styled.button`
  margin-bottom: 10px;
`;

export default Landing;
