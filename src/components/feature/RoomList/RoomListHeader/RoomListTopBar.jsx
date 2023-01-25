// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import { getCookie, getNicknameCookie } from 'utils/cookies';
import Modal from 'components/common/Modals/BasicModal/Modal';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';

function RoomListTopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  useEffect(() => {
    if (getCookie('my_token')) {
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  return (
    <StHeaderBox>
      <Link to="/">
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
      <Link to="/posts/all">
        <StCommunityBtn>
          <p>커뮤니티</p>
        </StCommunityBtn>
      </Link>
      {isSettingModalOn && (
        <Modal
          onClose={() => {
            setIsSettingModalOn(false);
          }}
          content={<SettingModal loggedIn={setIsLoggedIn} />}
        />
      )}
      <StSettingBtn
        onClick={() => {
          setIsSettingModalOn(true);
        }}
      >
        <img src={settingBtn} alt="설정" />
      </StSettingBtn>
    </StHeaderBox>
  );
}

const StHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StUserName = styled.div`
  font-family: MapoBackpacking;
  font-size: 22px;
  line-height: 22px;
  padding-top: 30px;
  margin-right: auto;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.lightBeige};

  em {
    text-decoration: underline;
  }
`;

const StCommunityBtn = styled.button`
  font-family: MapoBackpacking;
  font-size: 22px;
  line-height: 22px;
  padding-top: 30px;
  margin-right: 20px;
  color: ${({ theme }) => theme.colors.lightBeige};
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
  /* margin-left: auto; */
`;

export default RoomListTopBar;