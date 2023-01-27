/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

// 내부 모듈
import useToast from 'hooks/useToast';
import { createComment } from 'redux/modules/postSlice';
// import CommentList from './CommentList';

function CreateComment() {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const param = useParams();
  const { id } = param;
  //   console.log('param', postId);

  async function postComment() {
    const data = { comment, id };
    if (comment === '') {
      useToast('댓글 내용이 없닭!', 'warning');
    } else {
      dispatch(createComment(data));
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
