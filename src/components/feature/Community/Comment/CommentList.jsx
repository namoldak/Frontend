/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import { instance } from 'api/core/axios';
import React, { useState } from 'react';

// 내부 모듈

function CommentList(props) {
  const { id, comment, createdAt, nickname } = props;

  const [commentType, setCommentType] = useState('display');
  const [content, setContent] = useState(comment);

  function editComment() {
    if (commentType === 'display') {
      setCommentType('edit');
    } else if (commentType === 'edit') {
      setCommentType('display');
    }
  }

  async function onClickEditComment() {
    console.log('id', id);
    console.log('content', content);
    try {
      console.log('확인');
      await instance.put(`/posts/comments/${id}`, { comment: content });
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}

export default CommentList;
