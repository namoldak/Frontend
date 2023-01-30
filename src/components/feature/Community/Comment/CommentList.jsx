/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { getNicknameCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import { useDispatch } from 'react-redux';
import { readAllComments, readOnePost } from 'redux/modules/postSlice';

function CommentList(props) {
  const { id, commentId, comment, commentPage, nickname, createdAt } = props;

  const [commentType, setCommentType] = useState('display');
  const [content, setContent] = useState(comment);
  const myNickName = getNicknameCookie('nickname');

  const dispatch = useDispatch();

  function editComment() {
    if (commentType === 'display') {
      setCommentType('edit');
    } else if (commentType === 'edit') {
      setCommentType('display');
    }
  }

  async function onClickEditComment() {
    try {
      await instance.put(`/posts/comments/${commentId}`, { comment: content });
    } catch (error) {
      console.log(error);
    }
    dispatch(readAllComments({ id, commentPage }));
    dispatch(readOnePost(id));
    setCommentType('display');
  }

  async function onClickDeleteComment() {
    try {
      await instance.delete(`/posts/comments/${commentId}`);
    } catch (error) {
      console.log(error);
    }
    dispatch(readAllComments({ id, commentPage }));
    dispatch(readOnePost(id));
  }

  return (
    <StCommentContainer>
      <StBtnContainer>
        {nickname === myNickName ? (
          commentType === 'display' ? (
            <button onClick={editComment}>수정</button>
          ) : (
            <button onClick={onClickEditComment}>완료</button>
          )
        ) : (
          ''
        )}
        {nickname === myNickName ? (
          <button onClick={onClickDeleteComment}>삭제</button>
        ) : (
          ''
        )}
      </StBtnContainer>
      <StContentContainer>
        {commentType === 'edit' ? (
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        ) : (
          <div>{content}</div>
        )}
        <StInfoContainer>
          <span>{nickname}</span>
          <span>{createdAt}</span>
        </StInfoContainer>
      </StContentContainer>
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  border: 1px solid black;
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export default CommentList;
