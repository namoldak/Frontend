import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backBtn from '../../../../assets/images/backBtn.svg';
import settingBtn from '../../../../assets/images/settingBtn.svg';
import { getCookie, getNicknameCookie } from '../../../../utils/cookies';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');

  useEffect(() => {
    if (getCookie('my_token')) {
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  return (
    <StHeaderBox>
      <Link to="/">
        <StBackBtn>
          <img src={backBtn} alt="back_image" />
        </StBackBtn>
      </Link>
      <StUserName>
        {isLoggedIn ? (
          <span>반갑닭, {nickname}</span>
        ) : (
          <span>Guest는 로그인하고 이용해야한닭</span>
        )}
      </StUserName>
      <StSettingBtn>
        <img src={settingBtn} alt="setting_image" />
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
  font-size: 22px;
  line-height: 22px;
  padding-top: 30px;
  margin-right: auto;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.lightBeige};
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
  /* margin-left: auto; */
`;

export default Header;
