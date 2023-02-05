// 외부 모듈
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { readOnePost } from 'redux/postSlice';
import styled from 'styled-components';

// 내부 모듈
import { formatTime } from 'utils/date';

function Post({ postInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clickPost() {
    dispatch(readOnePost(postInfo.id));
    navigate(`/posts/${postInfo.id}`);
  }

  return (
    <StPost>
      <StPostBox key={postInfo.id} onClick={clickPost}>
        <PostTitle>{postInfo.title}</PostTitle>
        <CmtCnt>{postInfo.cmtCnt}</CmtCnt>
        <CreatedAt>{formatTime(postInfo?.createdAt)}</CreatedAt>
        <div>{postInfo.nickname}</div>
      </StPostBox>
    </StPost>
  );
}

const StPost = styled.div`
  display: flex;
  height: 54px;
`;

const StPostBox = styled.div`
  display: grid;
  grid-template-columns: 604px 110px 110px 110px;
  place-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};
`;

const PostTitle = styled.div`
  width: 600px;
  font-size: 16px;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  padding-left: 10px;
`;

const CmtCnt = styled.div`
  letter-spacing: 0.08em;
`;

const CreatedAt = styled.div``;

export default Post;
