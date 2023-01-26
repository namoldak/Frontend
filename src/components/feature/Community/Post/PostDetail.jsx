/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { readOnePost } from 'redux/modules/postSlice';
import CommentList from '../Comment/CommentList';
import CreateComment from '../Comment/CreateComment';

// 내부 모듈

function PostDetail() {
  const param = useParams();
  const post = useSelector((state) => state.posts.posts);
  const comment = post.commentList;

  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readOnePost(param.id));
  }, []);

  return (
    <div>
      <div>{post.title}</div>
      <div>
        {post.imageList?.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} alt="이미지" />
            </div>
          );
        })}
      </div>
      <div>{post.content}</div>
      <div>{post.nickname}</div>
      <div>{post.createdAt}</div>
      <div>
        <CreateComment />
        <button
          onClick={() => {
            setDisplay(!display);
          }}
        >
          {display && '댓글 숨기기'}
          {!display && `${post.cmtCnt}개의 댓글보기`}
        </button>
        {display &&
          comment.map((i) => {
            return (
              <CommentList
                key={i.id}
                id={i.id}
                comment={i.comment}
                nickname={i.nickname}
                createdAt={i.createdAt}
              />
            );
          })}
      </div>
    </div>
  );
}

export default PostDetail;
