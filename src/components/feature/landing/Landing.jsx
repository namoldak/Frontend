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
import bannerImage from '../../../assets/images/bannerImg.svg';
import landingToGameBtn from '../../../assets/images/landingToGameBtn.svg';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  console.log('nickname', nickname);
  console.log(isLoggedIn);

  useEffect(() => {
    if (getCookie('my_token')) {
      console.log('cookie');
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  function onClickLogOut() {
    removeCookie('my_token', 'nickname');
    alert('재밌었닭!');
    setIsLoggedIn(false);
  }

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
      <StHeaderBtnBox>
        <StBackBtn>
          <Link to="/login">
            <img src={backBtn} alt="back_image" />
          </Link>
        </StBackBtn>
        <StSettingBtn>
          <img src={settingBtn} alt="setting_image" />
        </StSettingBtn>
      </StHeaderBtnBox>
      <StLadingMain>
        <StBanner>
          <StBannerImg>
            <img src={bannerImage} alt="banner_image" />
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

const StHeaderBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
  /* margin-left: auto; */
`;

// background image 적용
const StLadingMain = styled.div`
  position: fixed;
  width: 1180px;
  height: 800px;
  background-image: url(${landingBack});
  background-size: cover;
  background-repeat: no-repeat;
`;

// 하위 컴포넌트 정렬 위함
const StBanner = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  position: absolute;
  top: -16%;
  left: 20%;
  width: 739px;
  height: 100%;
  margin: 0 auto;
`;

const StBannerImg = styled.div`
  width: 100%;
  height: 671px;
`;

const StToGameBtn = styled.button`
  margin-top: 10px;
`;

const StHeader = styled.div``;

export default Landing;
