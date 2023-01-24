// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import { getNicknameCookie } from 'utils/cookies';
import Modal from 'components/common/Modals/BasicModal/Modal';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';

function CommunityTopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  return (
    <StPostListHeader>
      <Link to="/rooms">
        <StBackBtn>
          <img src={backBtn} alt="뒤로 가기" />
        </StBackBtn>
      </Link>
      <StUserName>
        <span>
          반갑닭 <em>{nickname}</em> 이 곳은 커뮤니티닭
        </span>
      </StUserName>
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
    </StPostListHeader>
  );
}

const StPostListHeader = styled.div`
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
  margin-right: auto;
  margin-left: 20px;
  padding-top: 30px;
  color: ${({ theme }) => theme.colors.lightBeige};

  em {
    text-decoration: underline;
  }
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
`;

export default CommunityTopBar;
