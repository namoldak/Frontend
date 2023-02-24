// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 내부 모듈
import { getAccessToken, getNicknameCookie } from 'utils/cookies';
import SettingButton from 'components/common/Button/SettingButton';
import coummunityBtn from 'assets/images/communityBtn.svg';
import BackButton from 'components/common/Button/BackButton';

function RoomListTopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken('AccessToken')) {
      setIsLoggedIn(true);
    }
  }, [getAccessToken]);

  return (
    <StRoomListTopBar>
      <BackButton url="/" />
      <StUserName>
        {isLoggedIn ? (
          <span>
            <strong>{nickname}</strong> 환영한닭
          </span>
        ) : (
          <span>
            <strong>Guest</strong>는 로그인하고 이용해야한닭
          </span>
        )}
      </StUserName>
      <StCommunityBtn
        onClick={() => {
          navigate('/posts/all');
        }}
      >
        <img src={coummunityBtn} alt="커뮤니티" />
      </StCommunityBtn>
      <SettingButton />
    </StRoomListTopBar>
  );
}

const StRoomListTopBar = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  height: 78px;
`;

const StUserName = styled.div`
  font-family: MapoBackpacking;
  font-weight: 400;
  font-size: 32px;
  line-height: 35px;
  letter-spacing: 0.04em;
  color: #fff;
  margin: 12px auto 12px 20px;

  strong {
    font-size: 34px;
    line-height: 37px;
    margin-right: 5px;
    letter-spacing: 0.09em;
  }
`;

const StCommunityBtn = styled.button`
  margin: 8px 20px 0 0;

  @media ${(props) => props.theme.laptop} {
    img {
      height: 78px;
    }
  }
`;

export default RoomListTopBar;
