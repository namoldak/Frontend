// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import ViewPost from './ViewPost';

function PostList() {
  return (
    <StPostList>
      <ViewPost />
      <ViewPost />
      <ViewPost />
      <ViewPost />
      <ViewPost />
      <ViewPost />
    </StPostList>
  );
}

const StPostList = styled.section`
  width: 100%;
  height: 60vh;
  border: 1px solid black;
`;

export default PostList;
