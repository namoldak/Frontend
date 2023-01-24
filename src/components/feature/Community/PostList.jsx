// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import Post from './Post/Post';
import CommunityHeader from './CommunityHeader/CommunityHeader';

function PostList() {
  return (
    <StPostList>
      <CommunityHeader />
      <Post />
    </StPostList>
  );
}

const StPostList = styled.div``;

export default PostList;
