// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// 내부 모듈
import { getAccessToken, getNicknameCookie } from 'utils/cookies';
import ModalForSetting from 'components/common/Modals/BasicModal/ModalForSetting';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';
import coummunityBtn from 'assets/images/communityBtn.svg';

function RoomListTopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken('AccessToken')) {
      setIsLoggedIn(true);
    }
  }, [getAccessToken]);

  return (
    <StRoomListTopBar>
      <Link to="/" draggable="false">
        <StBackBtn>
          <img src={backBtn} alt="뒤로 가기" />
        </StBackBtn>
      </Link>
      <StUserName>
        {isLoggedIn ? (
          <span>
            <em>{nickname}</em> 환영한닭
          </span>
        ) : (
          <span>
            <em>Guest</em>는 로그인하고 이용해야한닭
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
      {isSettingModalOn && (
        <ModalForSetting
          onClose={() => {
            setIsSettingModalOn(false);
          }}
          content={<SettingModal setting={setIsSettingModalOn} />}
        />
      )}
      <StSettingBtn
        onClick={() => {
          setIsSettingModalOn(true);
        }}
      >
        <img src={settingBtn} alt="설정" />
      </StSettingBtn>
    </StRoomListTopBar>
  );
}

const StRoomListTopBar = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  height: 78px;
`;

const StBackBtn = styled.button`
  height: 78px;
`;

const StUserName = styled.div`
  font-family: MapoBackpacking;
  font-weight: 400;
  font-size: 32px;
  line-height: 35px;
  color: #fff;
  margin-right: auto;
  margin-left: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.04em;
  margin-top: 12px;

  em {
    font-size: 34px;
    line-height: 37px;
    margin-right: 5px;
    letter-spacing: 0.09em;
  }
`;

const StCommunityBtn = styled.button`
  /* width: 217px; */
  /* height: 71px; */
  margin: 8px 20px 0 0;

  @media ${(props) => props.theme.laptop} {
    img {
      height: 78px;
    }
  }
`;

const StSettingBtn = styled.button`
  height: 78px;
`;

export default RoomListTopBar;
