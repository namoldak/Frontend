/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import { readAllPosts } from 'redux/modules/postSlice';
import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';
import landingBack from 'assets/images/landingBack.svg';
import settingBack from 'assets/images/settingBack.png';
import Post from './Post';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import WritePostBtn from '../CommunityHeader/WritePostBtn';

function PostList() {
  const { postCnt, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(page + 1);

  console.log('page', page);
  console.log('currentPage', currentPage);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(postCnt / 10); i += 1) {
    pageNumber.push(i);
  }

  useEffect(() => {
    dispatch(readAllPosts(page));
  }, [page]);

  return (
    <StPostList>
      {/* <button
        onClick={() => {
          setPage(page - 1);
          setCurrentPage(page - 2);
        }}
        disabled={page === 0}
      >
        이전
      </button>
      <div>
        {pageNumber.map((num) => (
          <li
            role="presentation"
            key={num + 1}
            onClick={() => {
              setPage(num - 1);
              setCurrentPage(num);
            }}
          >
            <button>{num}</button>
          </li>
        ))}
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
          setCurrentPage(page + 2);
        }}
        disabled={page === pageNumber.length - 1}
      >
        다음
      </button> */}
      <StListBackground>
        <StListBorder>
          <CommunityHeader />
          {/* <div style={{ marginTop: '20px' }}> */}
          <StInfoBanner>
            <div>제목</div>
            <div>댓글 수</div>
            <div>닉네임</div>
            <div>작성일</div>
          </StInfoBanner>
          {postResponseDtoList &&
            postResponseDtoList.map((post) => {
              return (
                <StPostContainer key={post.id}>
                  <Post postInfo={post} />
                </StPostContainer>
              );
            })}
          {/* </div> */}
          <WritePostBtn />
        </StListBorder>
      </StListBackground>
    </StPostList>
  );
}

const StPostList = styled.div`
  height: calc(100vh - 201px);
  background-image: url(${settingBack});
  background-repeat: no-repeat;
  background-position: center;

  place-items: center;

  position: relative;
`;

const StListBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const StListBorder = styled.div`
  background-color: rgba(4, 2, 0, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  padding: 40px 35px;
  margin-top: 95px;
  gap: 12px;

  width: 1004px;
  height: 590px;
`;

const StInfoBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.yellowBeige};
  font-weight: 500;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
  border-radius: 5px;
  width: 100%;
  height: 60px;
`;

const StPostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBeige};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;
  border-radius: 5px;
  width: 100%;
  height: 60px;
`;

const StLeftBtn = styled.button`
  height: 52px;
  margin-right: 40px;
`;

const StRightBtn = styled.button`
  height: 52px;
  margin-left: 40px;
`;

const StEmptyDiv = styled.div`
  height: 50px;
`;

export default PostList;
