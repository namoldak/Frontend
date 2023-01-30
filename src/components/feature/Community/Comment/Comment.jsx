/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { getNicknameCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import { useDispatch } from 'react-redux';
import { readOnePost } from 'redux/modules/postSlice';
import { formatTime } from 'utils/date';
// import { readComments } from 'redux/modules/commentSlice';

function Comment(props) {
  const { id, commentId, comment, commentPage, nickname, createdAt } = props;

  const dispatch = useDispatch();
  const [commentType, setCommentType] = useState('display');
  const [content, setContent] = useState(comment);
  const myNickName = getNicknameCookie('nickname');

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
    // dispatch(readComments({ id, commentPage }));
    dispatch(readOnePost(id));
    setCommentType('display');
  }

  async function onClickDeleteComment() {
    try {
      await instance.delete(`/posts/comments/${commentId}`);
    } catch (error) {
      console.log(error);
    }
    // dispatch(readComments({ id, commentPage }));
    dispatch(readOnePost(id));
  }

  return (
    <StCommentContainer>
      <StCommentBox>
        {commentType === 'edit' ? (
          <StEditComment
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        ) : (
          <div>{content}</div>
        )}
        <StInfoBox>
          <Nickname>{nickname}</Nickname>
          <span>|</span>
          <CreatedAt>{formatTime(createdAt)}</CreatedAt>
        </StInfoBox>
      </StCommentBox>
      <StBtnContainer>
        {nickname === myNickName ? (
          commentType === 'display' ? (
            <StMyBtn onClick={editComment}>수정하기</StMyBtn>
          ) : (
            <StMyBtn onClick={onClickEditComment}>수정완료</StMyBtn>
          )
        ) : (
          <div style={{ display: 'none' }} />
        )}
        {nickname === myNickName ? (
          <StMyBtn onClick={onClickDeleteComment}>삭제하기</StMyBtn>
        ) : (
          <div style={{ display: 'none' }} />
        )}
      </StBtnContainer>
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  border-top: 2px solid rgba(48, 48, 48, 0.25);
  height: 70px;
  padding-top: 8px;
`;

const StCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #020202;
`;

const StEditComment = styled.input`
  width: 76%;
  border: 0;
  background: transparent;
  border-bottom: 3px solid ${({ theme }) => theme.colors.yellowBeige};
  margin-left: 10px;

  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  :focus {
    outline: none;
  }
`;

const StInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100px;

  span {
    margin: 0 4px 0 4px;
  }
`;

const Nickname = styled.div``;

const CreatedAt = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.04em;
`;

const StBtnContainer = styled.div`
  display: flex;
  width: 120px;
  height: 24px;
  margin-left: auto;
`;

const StMyBtn = styled.button`
  width: 58px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.lightBrown};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.lightBeige};
  margin-top: 10px;

  &:first-child {
    margin-right: 8px;
  }
`;

export default Comment;