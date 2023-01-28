// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import PostList from 'components/feature/Community/Post/PostList';
import CommunityTopBar from 'components/feature/Community/CommunityHeader/CommunityTopBar';
import settingBack from 'assets/images/settingBack.png';

function CommunityPage() {
  return (
    <StCommunity>
      <CommunityTopBar />
      <PostList />
    </StCommunity>
  );
}

const StCommunity = styled.div`
  padding-top: 80px;
`;

export default CommunityPage;
