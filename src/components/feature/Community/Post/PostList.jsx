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
      {postResponseDtoList &&
        postResponseDtoList.map((post) => {
          return (
            <div key={post.id}>
              <Post postInfo={post} />
            </div>
          );
        })}
    </StPostList>
  );
}

const StPostList = styled.div``;

export default PostList;
