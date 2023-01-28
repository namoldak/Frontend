// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import { getNicknameCookie } from 'utils/cookies';
import ModalForSetting from 'components/common/Modals/BasicModal/ModalForSetting';
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
    </StPostListHeader>
  );
}

const StPostListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;

  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
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

  em {
    font-size: 34px;
    line-height: 37px;
    text-decoration: underline;
    margin-right: 5px;
  }
`;

const StSettingBtn = styled.button`
  height: 78px;
`;

export default CommunityTopBar;
