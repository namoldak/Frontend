import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backBtn from '../../../../assets/images/backBtn.svg';
import settingBtn from '../../../../assets/images/settingBtn.svg';

function Header() {
  return (
    <StHeaderBox>
      <Link to="/">
        <StBackBtn>
          <img src={backBtn} alt="back_image" />
        </StBackBtn>
      </Link>
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

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
  /* margin-left: auto; */
`;

export default Header;
