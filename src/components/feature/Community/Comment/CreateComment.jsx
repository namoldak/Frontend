/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// 내부 모듈
import useToast from 'hooks/useToast';
import { instance } from 'api/core/axios';
import { readOnePost } from 'redux/modules/postSlice';
// import { readComments } from 'redux/modules/commentSlice';

function CreateComment({ comment, setComment, comments }) {
  const { id } = useParams();

  async function postComment() {
    const data = { comment, id };

    if (comment === '') {
      useToast('댓글 내용이 없닭!', 'warning');
      return;
    }

    await instance.post(`/posts/${id}/comments`, data).then((res) => {
      comments.unshift(res.data);
    });
    setComment('');
  }

  return (
    <StCreateComment>
      <StCommentInput
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="댓글을 입력해주세요."
      />
      <StCommentBtn onClick={postComment}>댓글쓰기</StCommentBtn>
    </StCreateComment>
  );
}

const StCreateComment = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const StCommentInput = styled.input`
  width: 892px;
  height: 80px;
  border-radius: 10px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.yellowBeige};
  padding-left: 9px;

  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.text3};
  }

  :focus {
    outline: none;
  }
`;

const StCommentBtn = styled.button`
  position: absolute;
  bottom: 7px;
  right: 6px;
  width: 78px;
  height: 27px;
  background-color: ${({ theme }) => theme.colors.lightBrown};
  border-radius: 4px;

  color: ${({ theme }) => theme.colors.lightBeige};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
`;

export default CreateComment;
