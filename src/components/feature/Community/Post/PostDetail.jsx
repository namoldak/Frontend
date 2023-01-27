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
  const dispatch = useDispatch();
  console.log('postId', param.id);

  const select = useSelector((state) => state.posts.posts);
  console.log('select', select);
  const post = select.postResponseDtoList;
  const comment = select.postResponseDtoList.commentList;

  console.log('post', post);
  console.log('comment', comment);

  const postDetail = post.find((item) => item.id === Number(param.id));

  console.log('postDetail', postDetail);

  useEffect(() => {
    dispatch(readOnePost(Number(param.id)));
  }, []);

  return (
    <div>
      <div>
        <div>{postDetail.title}</div>
        <div>{postDetail.content}</div>
        <div>{postDetail.nickname}</div>
        <div>{postDetail.commentList}</div>
      </div>
      <div>
        <CreateComment />
        {/* <CommentList /> */}
        {/* {commentList &&
          commentList.map((comment) => {
            return (
              <div>
                <div>{comment.comment}</div>
              </div>
            );
          })} */}
      </div>
    </div>
  );
}

export default PostDetail;
