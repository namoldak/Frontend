/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// 내부 모듈
import useToast from 'hooks/useToast';
import { instance } from 'api/core/axios';
import { readOnePost } from 'redux/modules/postSlice';
import { useSelector } from 'react-redux';

function CreateComment() {
  const [comment, setComment] = useState('');

  const param = useParams();
  const { id } = param;

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
