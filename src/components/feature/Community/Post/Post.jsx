// 외부 모듈
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { readOnePost } from 'redux/modules/postSlice';
import styled from 'styled-components';

// 내부 모듈

function Post({ postInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clickPost() {
    dispatch(readOnePost(postInfo.id));
    navigate(`/posts/${postInfo.id}`);
  }

  return (
    <StPost>
      <StPostBorder key={postInfo.id} role="presentation" onClick={clickPost}>
        <div>{postInfo.title}</div>
        <div>
          {postInfo.category === 'freeBoard' ? '자유게시판' : '유저피드백'}
        </div>
        <div>닉네임: {postInfo.nickname}</div>
        <div>댓글 수: {postInfo.cmtCnt}</div>
        <div>{postInfo.createdAt}</div>
      </StPostBorder>
    </StPost>
  );
}

const StPost = styled.div``;

const StPostBorder = styled.div`
  border: 1px solid black;
`;

export default Post;
