/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import {
  readAllPosts,
  readPostsByCategory,
  searchPosts,
} from 'redux/modules/postSlice';
import postMy from 'assets/images/postMy.svg';
import postWrite from 'assets/images/postWrite.svg';
import Pagination from './Pagination';
import Post from './Post/Post';
import PostCategory from './CommunityHeader/PostCategory';
import SearchPost from './CommunityHeader/SearchPost';

function PostList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('freeBoard');
  const [keyword, setKeyword] = useState('');
  const { totalPage, postCnt, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );

  useEffect(() => {
    if (category === 'freeBoard') {
      dispatch(readAllPosts(page));
    } else {
      dispatch(readPostsByCategory(page));
    }
    if (category === keyword) {
      dispatch(searchPosts(keyword, page));
    }
  }, [category, page]);

  return (
    <>
      <StCategoryAndSearch>
        <PostCategory setCategory={setCategory} page={page} setPage={setPage} />
        <SearchPost keyword={keyword} setKeyword={setKeyword} />
      </StCategoryAndSearch>
      <StPostBox>
        <StInfoBanner>
          <div>제목</div>
          <div>댓글 수</div>
          <div>작성일</div>
          <div>닉네임</div>
        </StInfoBanner>
        {postResponseDtoList &&
          postResponseDtoList.map((post) => {
            return (
              <StPostContainer key={post.id}>
                <Post postInfo={post} />
              </StPostContainer>
            );
          })}
      </StPostBox>
      <StCommunityBottom>
        <StMyPost>
          <img src={postMy} alt="내가 쓴 게시글 확인하기" />
        </StMyPost>
        <Pagination />
        <StWritePost>
          <Link to="/posts/write">
            <img src={postWrite} alt="글 작성하기" />
          </Link>
        </StWritePost>
      </StCommunityBottom>
    </>
  );
}

const StCategoryAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StPostBox = styled.div`
  min-height: 384px;
`;

const StInfoBanner = styled.div`
  width: 934px;
  height: 54px;
  background-color: ${({ theme }) => theme.colors.yellowBeige};
  border-radius: 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  display: grid;
  grid-template-columns: 604px 110px 110px 110px;
  /* grid-template-columns: 4fr 1fr 1fr 1fr; */
  place-items: center;
  margin: 12px 0 12px 0;
`;

const StPostContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 4px;
  margin-bottom: 12px;
`;

const StCommunityBottom = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  height: 46px;
`;

const StMyPost = styled.button``;

const StWritePost = styled.button``;

export default PostList;
