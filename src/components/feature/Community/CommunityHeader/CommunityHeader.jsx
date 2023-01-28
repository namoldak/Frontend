// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import PostCategory from './PostCategory';
import SearchPost from './SearchPost';

function CommunityHeader() {
  return (
    <StCommunityHeader>
      <PostCategory />
      <SearchPost />
    </StCommunityHeader>
  );
}

const StCommunityHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default CommunityHeader;
