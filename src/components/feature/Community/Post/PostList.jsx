// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import { readAllPosts, readPostsByCategory } from 'redux/modules/postSlice';
import Post from './Post';
import CommunityHeader from '../CommunityHeader/CommunityHeader';

function PostList() {
  const { totalPage, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );

  const dispatch = useDispatch();

  console.log('postlist', postResponseDtoList);
  console.log('totalPage', totalPage);

  useEffect(() => {
    dispatch(readAllPosts());
  }, []);

  return (
    <StPostList>
      <CommunityHeader />
      <StInfoBanner>
        <div>카테고리</div>
        <div>제목</div>
        <div>댓글 수</div>
        <div>닉네임</div>
        <div>작성일</div>
      </StInfoBanner>
      {postResponseDtoList &&
        postResponseDtoList.map((post) => {
          return (
            <StPostContainer key={post.id}>
              <Post postInfo={post} />
            </StPostContainer>
          );
        })}
    </StPostList>
  );
}

const StPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StInfoBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
  border-radius: 5px;
  width: 100%;
  height: 60px;

  padding: 20px;
`;

const StPostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  justify-content: center;
  border-radius: 5px;

  width: 100%;
  height: 60px;

  padding: 20px;
  place-items: center;
`;

export default PostList;
