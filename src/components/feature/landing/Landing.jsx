// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import MySetting from './MySetting';
import GameRule from './GameRule';
import TextButton from '../../common/TextButton';
import {
  getCookie,
  getNicknameCookie,
  removeCookie,
} from '../../../utils/cookies';
import backBtn from '../../../assets/images/backBtn.svg';
import settingBtn from '../../../assets/images/settingBtn.svg';
import landingBack from '../../../assets/images/landingBack.svg';
import landingTitle from '../../../assets/images/landingTitle.svg';
import landingBanner from '../../../assets/images/landingBanner.svg';
import landingToGameBtn from '../../../assets/images/landingToGameBtn.svg';
import Modal from '../../common/Modals/BasicModal/Modal';
import MyPageModal from '../../common/Modals/BasicModal/MyPageModal';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  console.log('nickname', nickname);
  console.log(isLoggedIn);

  useEffect(() => {
    if (getCookie('my_token')) {
      console.log('cookie');
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  return (
    <StLanding>
      {/* <StHeader>
        {isLoggedIn ? (
          <div>
            <button onClick={onClickLogOut}>로그아웃</button>
            <div>반갑닭, {nickname}</div>
            <MySetting />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <TextButton>로그인</TextButton>
            </Link>
            <div>Guest는 로그인하고 이용해야한닭</div>
          </div>
        )}
      </StHeader> */}
      <StLandingHeader>
        <StBackBtn>
          <Link to="/login">
            <img src={backBtn} alt="back_image" />
          </Link>
        </StBackBtn>
        {isSettingModalOn && (
          <Modal
            onClose={() => {
              setIsSettingModalOn(false);
            }}
            content={<MyPageModal loggedIn={setIsLoggedIn} />}
          />
        )}
        <StSettingBtn
          onClick={() => {
            setIsSettingModalOn(true);
          }}
        >
          <img src={settingBtn} alt="setting_image" />
        </StSettingBtn>
      </StLandingHeader>
      <StLadingMain>
        <StBanner>
          <StBannerTitle>
            <img src={landingTitle} alt="나만 모른 닭" />
          </StBannerTitle>
          <StBannerImg>
            <img src={landingBanner} alt="banner_image" />
          </StBannerImg>
          <GameRule />
          <StToGameBtn>
            <Link to="/rooms">
              <img src={landingToGameBtn} alt="button" />
            </Link>
          </StToGameBtn>
        </StBanner>
      </StLadingMain>
    </StLanding>
  );
}

// header + main
const StLanding = styled.div`
  padding: 10px;
`;

const StLandingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
`;

// background image 적용
const StLadingMain = styled.div`
  /* position: fixed; */
  width: 1180px;
  height: 800px;
  background-image: url(${landingBack});
  background-size: cover;
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
  /* height: 671px; */
`;

const StToGameBtn = styled.button`
  margin-top: 10px;
`;

const StHeader = styled.div``;

export default Landing;
