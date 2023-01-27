// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
// import CommunityHeader from 'components/feature/Community/CommunityHeader/CommunityHeader';
import PostList from 'components/feature/Community/Post/PostList';
import CommunityTopBar from 'components/feature/Community/CommunityHeader/CommunityTopBar';

function CommunityPage() {
  return (
    <StCommunity>
      {/* <CommunityHeader /> */}
      <CommunityTopBar />
      <PostList />
    </StCommunity>
  );
}

const StCommunity = styled.div`
  /* padding-top: 85px; */
`;

export default CommunityPage;
