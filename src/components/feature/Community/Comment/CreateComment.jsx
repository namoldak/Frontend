/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// 내부 모듈
import useToast from 'hooks/useToast';
import { instance } from 'api/core/axios';
import { readAllComments, readOnePost } from 'redux/modules/postSlice';

function CreateComment({ commentPage }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  async function postComment() {
    const data = { comment, id };
    if (comment === '') {
      useToast('댓글 내용이 없닭!', 'warning');
    } else {
      try {
        await instance.post(`/posts/${data.id}/comments`, data);
      } catch (error) {
        console.log(error);
      }
      dispatch(readAllComments({ id, commentPage }));
      dispatch(readOnePost(id));
      setComment('');
    }
  }

  return (
    <div>
      <div>
        <input
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={postComment}>comment</button>
      </div>
    </div>
  );
}

export default CreateComment;
