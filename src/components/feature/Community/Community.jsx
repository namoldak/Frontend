// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import PostList from './Post/PostList';
import CommunityHeader from './CommunityHeader/CommunityHeader';

function Community() {
  return (
    <StPostList>
      <CommunityHeader />
      <PostList />
    </StPostList>
  );
}

const StPostList = styled.div``;

export default Community;
