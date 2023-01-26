// 외부 모듈
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { readOnePost } from 'redux/modules/postSlice';
// import CommentList from '../Comment/CommentList';
import CreateComment from '../Comment/CreateComment';

// 내부 모듈

function PostDetail() {
  const param = useParams();
  const post = useSelector((state) => state.posts.posts);
  const comment = post.commentList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readOnePost(param.id));
  }, []);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.nickname}</div>
      <div>{post.createdAt}</div>
      <div>
        <CreateComment />
        {comment &&
          comment.map((item) => {
            return (
              <div key={item.id}>
                <div>{item.comment}</div>
                <div>{item.nickname}</div>
                <div>{item.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PostDetail;
