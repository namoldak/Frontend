// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import { readAllPosts } from 'redux/modules/postSlice';
import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';
import Post from './Post';
import CommunityHeader from '../CommunityHeader/CommunityHeader';

function PostList() {
  const { totalPage, postCnt, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );

  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  // const [pageArry, setPageArray] = useState([]);
  // const [limit, setLimit] = useState(10);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(postCnt / 10); i += 1) {
    pageNumber.push(i);
  }

  const dispatch = useDispatch();

  // console.log('postlist', postResponseDtoList);
  // console.log('totalPage', totalPage);

  // function onChangePage(page) {
  //   setPage(page);
  // }

  useEffect(() => {
    dispatch(readAllPosts(page));
    setStart(page * 5);
  }, [page]);

  return (
    <StPostList>
      <CommunityHeader />
      <div>
        {pageNumber.map((num) => (
          <li role="presentation" key={num} onClick={() => setPage(num - 1)}>
            <button>{num}</button>
          </li>
        ))}
      </div>
      <StInfoBanner>
        <div>카테고리</div>
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
    </StPostList>
  );
}

const StPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StInfoBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
  border-radius: 5px;
  width: 100%;
  height: 60px;

  padding: 20px;
`;

const StPostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  justify-content: center;
  border-radius: 5px;

  width: 100%;
  height: 60px;

  padding: 20px;
  place-items: center;
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
