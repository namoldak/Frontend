import React from 'react';
import styled from 'styled-components';
import CommunityTopBar from './CommunityTopBar';
import WritePostBtn from './WritePostBtn';
import PostCategory from './PostCategory';
import SearchPost from './SearchPost';

function CommunityHeader() {
  return (
    <StCommunityHeader>
      <CommunityTopBar />
      <StCommunityHeaderBox>
        <SearchPost />
        <PostCategory />
        <WritePostBtn />
      </StCommunityHeaderBox>
    </StCommunityHeader>
  );
}

const StCommunityHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const StCommunityHeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

export default CommunityHeader;
