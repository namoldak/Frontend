/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

// 내부 모듈
import { formatTime } from 'utils/date';
import { readOnePost } from 'redux/modules/postSlice';
import { getNicknameCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import Comment from '../Comment/Comment';
import CreateComment from '../Comment/CreateComment';

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const myNickName = getNicknameCookie('nickname');
  const { posts } = useSelector((state) => state.posts);
  const [isWriter, setIsWriter] = useState(false);
  const [comment, setComment] = useState('');
  // initial state
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [commentPage, setCommentPage] = useState(0); // 스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 state
  const pageEnd = useRef(); // 페이지의 마지막 요소(infinite scroll의 탐색 타겟)

  console.log('1');

  const loadMore = () => {
    if (commentPage < totalPage) {
      setCommentPage((commentPage) => commentPage + 1);
    }
    if (commentPage === totalPage - 1) {
      setIsLoading(false);
    }
  };

  function deletePost() {
    instance.delete(`/posts/${id}`).then((res) => {
      navigate('/posts/all');
    });
  }

  function updatePost() {
    navigate(`/posts/modify/${id}`);
  }

  useEffect(() => {
    if (myNickName === posts.nickname) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [myNickName, posts.nickname]);

  useEffect(() => {
    dispatch(readOnePost(id));
  }, []);

  const getComment = async () => {
    await instance
      .get(`/posts/${id}/comments/all?page=${commentPage}&size=10`)
      .then((res) => {
        const { totalPage, commentResponseDtoList } = res.data;
        setComments((prev) => [...prev, ...commentResponseDtoList]);
        setTotalPage(totalPage);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    getComment(commentPage);
  }, [commentPage]);

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 },
      );
      // 옵져버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [isLoading]);

  // console.log(comments);
  // console.log('commentPage', commentPage);
  // console.log('totalPage', totalPage);
  // console.log(isLoading);

  // useEffect(() => {
  //   getComment();
  // }, [setComment]);

  return (
    <StPostDetail>
      <StTitleBox>
        <Title>{posts.title}</Title>
        <StInfoBox>
          <Nickname>{posts.nickname}</Nickname>
          <span>|</span>
          <CreatedAt>{formatTime(posts.createdAt)}</CreatedAt>
        </StInfoBox>
      </StTitleBox>
      <StContentBox>
        {isWriter && (
          <StBtnBox>
            <StModify onClick={updatePost}>수정하기</StModify>
            <StModify onClick={deletePost}>삭제하기</StModify>
          </StBtnBox>
        )}
        <ImgDiv>
          {posts.imageList?.map((image, index) => {
            return (
              <div key={index}>
                <img src={image} alt="이미지" />
              </div>
            );
          })}
        </ImgDiv>
        <Content>{posts.content}</Content>
        <div>
          <CreateComment
            comments={comments}
            setComment={setComment}
            comment={comment}
          />
          {comments?.map((i) => {
            return (
              <Comment
                id={id}
                key={i.id}
                commentId={i.id}
                comment={i.comment}
                nickname={i.nickname}
                createdAt={i.createdAt}
              />
            );
          })}
          <Target ref={pageEnd} />
        </div>
      </StContentBox>
    </StPostDetail>
  );
}

const Target = styled.div`
  height: 20px;
`;

const StPostDetail = styled.div`
  overflow: auto;
  max-height: 517px;
  padding-left: unset;

  &::-webkit-scrollbar {
    width: 10px;
    height: 517px;
    background: #f5ecd9;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    min-height: 76px;
    background: #6e3d12;
    border: 2px solid #965e2e;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;

const StTitleBox = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  width: 916px;
  height: 59px;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 10px;
  padding: 10px 12px 10px 12px;

  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};
`;

const Title = styled.div``;

const StInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 130px;

  span {
    margin: 0 4px 0 4px;
  }
`;

const Nickname = styled.div``;

const CreatedAt = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.04em;
`;

const StContentBox = styled.div`
  width: 916px;
  min-height: 447px;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 4px;
  padding: 20px 15px 20px 15px;
  margin-top: 10px;
`;

const StModify = styled.button`
  width: 58px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.lightBrown};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.lightBeige};

  &:first-child {
    margin-right: 8px;
  }
`;

const ImgDiv = styled.div`
  max-width: 300px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  max-width: 600px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 38px;
`;

const StBtnBox = styled.div`
  float: right;
`;
export default PostDetail;
