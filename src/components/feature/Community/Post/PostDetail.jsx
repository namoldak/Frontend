/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import settingBtn from 'assets/images/settingBtn.svg';
import { readOnePost } from 'redux/modules/postSlice';
import Modal from 'components/common/Modals/BasicModal/Modal';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import { getNicknameCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import CommentList from '../Comment/CommentList';
import CreateComment from '../Comment/CreateComment';

function PostDetail() {
  const post = useSelector((state) => state.posts.posts);
  const comment = post.commentList;
  const param = useParams();
  const dispatch = useDispatch();
  const myNickName = getNicknameCookie('nickname');
  const [isWriter, setIsWriter] = useState(false);
  const navigate = useNavigate();

  const [display, setDisplay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  async function deletePost() {
    instance.delete(`/posts/${param.id}`).then((res) => {
      navigate('/posts/all');
    });
  }

  function updatePost() {
    navigate(`/posts/modify/${param.id}`);
  }
  useEffect(() => {
    if (myNickName === post.nickname) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [myNickName, post.nickname]);

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
      <StPostDetailInner>
        <StTitleBox>
          <StTitle>{post.title}</StTitle>
          <StNickName>{post.nickname}</StNickName>
          <StCreated>{post.createdAt}</StCreated>
        </StTitleBox>
        <StContentBox>
          {isWriter ? (
            <StBtnBox>
              <button onClick={updatePost}>수정하기</button>
              <button onClick={deletePost}>삭제하기</button>
            </StBtnBox>
          ) : (
            <>작성자 불일치</>
          )}

          <StImgdiv>
            {post.imageList?.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} alt="이미지" />
                </div>
              );
            })}
          </StImgdiv>
          <div>{post.content}</div>

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
        </StContentBox>
      </StPostDetailInner>
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

const StPostDetailInner = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  background-color: black;
  padding: 20px;
`;
const StImgdiv = styled.div`
  max-width: 300px;
  max-height: 300px;
`;

const StContentBox = styled.div`
  border: 2px solid white;
  background-color: beige;
  margin-top: 20px;
`;
const StTitleBox = styled.div`
  border: 2px solid blue;
  background-color: beige;
`;
const StBtnBox = styled.div`
  float: right;
`;
const StTitle = styled.div`
  display: inline-block;
`;
const StNickName = styled.div`
  display: inline-block;
`;
const StCreated = styled.div`
  display: inline-block;
`;
export default PostDetail;
