// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
// import { getNicknameCookie } from 'utils/cookies';
import backBtn from 'assets/images/backBtn.svg';
import SettingBtn from 'components/common/SettingBtn';

function CommunityTopBar(page) {
  // const nickname = getNicknameCookie('nickname');

  return (
    <StCommunityTobBar>
      <Link to="/rooms">
        <StBackBtn>
          <img src={backBtn} alt="뒤로 가기" />
        </StBackBtn>
      </Link>
      {/* <StUserName>
        <span>
          반갑닭 <em>{nickname}</em> 이 곳은 커뮤니티닭
        </span>
      </StUserName> */}
      <SettingBtn />
    </StCommunityTobBar>
  );
}

const StCommunityTobBar = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  height: 78px;
  padding-bottom: 38px;
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

export default CommunityTopBar;
