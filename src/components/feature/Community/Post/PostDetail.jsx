/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';
import { readOnePost } from 'redux/modules/postSlice';
import Modal from 'components/common/Modals/BasicModal/Modal';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import CommentList from '../Comment/CommentList';
import CreateComment from '../Comment/CreateComment';

function PostDetail() {
  const post = useSelector((state) => state.posts.posts);
  const comment = post.commentList;
  const param = useParams();
  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  useEffect(() => {
    dispatch(readOnePost(param.id));
  }, []);

  return (
    <StPostDetail>
      <StTopBar>
        <Link to="/posts/all">
          <StBackBtn>
            <img src={backBtn} alt="뒤로 가기" />
          </StBackBtn>
        </Link>
        {isSettingModalOn && (
          <Modal
            onClose={() => {
              setIsSettingModalOn(false);
            }}
            content={<SettingModal loggedIn={setIsLoggedIn} />}
          />
        )}
        <StSettingBtn
          onClick={() => {
            setIsSettingModalOn(true);
          }}
        >
          <img src={settingBtn} alt="설정" />
        </StSettingBtn>
      </StTopBar>
      <div>{post.title}</div>
      <div>
        {post.imageList?.map((image, index) => {
          return (
            <div key={index}>
              <StImg src={image} alt="이미지" />
            </div>
          );
        })}
      </div>
      <div>{post.content}</div>
      <div>{post.nickname}</div>
      <div>{post.createdAt}</div>
      <div>
        <CreateComment postId={param.id} />
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
                postId={param.id}
                key={i.id}
                id={i.id}
                comment={i.comment}
                nickname={i.nickname}
                createdAt={i.createdAt}
              />
            );
          })}
      </div>
    </StPostDetail>
  );
}

const StPostDetail = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const StTopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StImg = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StSettingBtn = styled.button`
  width: 78px;
  height: 78px;
`;

export default PostDetail;
