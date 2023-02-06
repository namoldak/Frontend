// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// 내부 모듈
import SettingButton from 'components/common/Button/SettingButton';
import backBtn from 'assets/images/backBtn.svg';
import communityBack from 'assets/images/communityBack.png';

function PostWrapper() {
  const navigate = useNavigate();

  return (
    <StPostWrapper>
      <StTopBar>
        <Link to="/posts/all" draggable="false">
          <StBackBtn>
            <img src={backBtn} alt="뒤로 가기" />
          </StBackBtn>
        </Link>
        <SettingButton />
      </StTopBar>
      <StCommunityBack>
        <StBlackBack>
          <Outlet />
        </StBlackBack>
      </StCommunityBack>
    </StPostWrapper>
  );
}

const StPostWrapper = styled.div`
  padding-top: 85px;

  @media ${(props) => props.theme.laptop} {
    padding-top: 22px;
  }
`;

const StTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 38px;

  @media ${(props) => props.theme.laptop} {
    margin-bottom: 8px;
  }
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StCommunityBack = styled.div`
  height: 713px;
  background-image: url(${communityBack});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBlackBack = styled.div`
  width: 1004px;
  height: 590px;
  background-color: rgba(4, 2, 0, 0.8);
  border-radius: 30px;
  padding: 40px 35px 40px 35px;
`;

export default PostWrapper;
