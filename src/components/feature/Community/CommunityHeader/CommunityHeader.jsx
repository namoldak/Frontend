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
`;

const StCommunityHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 38px; */
`;

export default CommunityHeader;
