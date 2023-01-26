/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import { instance } from 'api/core/axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// 내부 모듈

function CommentList(props) {
  const { id, content, createdAt, nickname } = props;

  console.log('content', content);

  const [commentType, setCommentType] = useState('display');
  const [comment, setComment] = useState('');
  console.log('comment', comment);
  const dispatch = useDispatch();

  function editComment() {
    if (commentType === 'display') {
      setCommentType('edit');
    } else if (commentType === 'edit') {
      setCommentType('display');
    }
  }

  async function onClickEditComment() {
    console.log('id', id);
    console.log('comment', comment);
    try {
      await instance.put(`/posts/comments/${id}`, { comment });
    } catch (error) {
      console.log(error);
    }
    setCommentType('display');
  }

  async function onClickDeleteComment() {
    try {
      await instance.delete(`/posts/comments/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ border: '1px solid black' }}>
      {commentType === 'display' ? (
        <button onClick={editComment}>수정</button>
      ) : (
        <button onClick={onClickEditComment}>완료</button>
      )}
      <div>{nickname}</div>
      <div>{createdAt}</div>
      <button onClick={onClickDeleteComment}>delete</button>
      {commentType === 'edit' ? (
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}

export default CommentList;
