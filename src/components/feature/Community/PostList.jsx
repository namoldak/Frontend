// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import { readAllPosts, readPostsByCategory } from 'redux/modules/postSlice';
import { useSearchParams } from 'react-router-dom';
import Post from './Post/Post';
import CommunityHeader from './CommunityHeader/CommunityHeader';

function PostList() {
  const postList = useSelector((state) => state.posts.posts);
  console.log(postList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllPosts());
  }, []);

  return (
    <StPostList>
      <CommunityHeader />
      {postList &&
        postList.map((post) => {
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
