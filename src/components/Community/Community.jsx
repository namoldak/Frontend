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
} from 'redux/postSlice';
import postWrite from 'assets/images/postWrite.svg';
import usePreventGoBack from 'hooks/usePreventGoBack';
import Pagination from './Pagination';
import Post from './Post/Post';
import PostCategory from './PostCategoryAndSearch/PostCategory';
import SearchPost from './PostCategoryAndSearch/SearchPost';

function PostList() {
  const [page, setPage] = useState(0);
  const [currPage, setCurrPage] = useState(page + 1);
  const [category, setCategory] = useState('freeBoard');
  const [keyword, setKeyword] = useState('');
  const { postResponseDtoList } = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (category === 'freeBoard') {
      dispatch(readAllPosts(page));
    } else if (category === 'feedBackBoard') {
      dispatch(readPostsByCategory({ category, page }));
    } else if (category === 'search') {
      dispatch(searchPosts({ keyword, page }));
    } else if (category === 'myBoard') {
      dispatch(readPostsByCategory({ category: 'freeBoard', page }));
    }
  }, [category, page]);

  usePreventGoBack();

  return (
    <>
      <StCategoryAndSearch>
        <PostCategory
          setCategory={setCategory}
          setPage={setPage}
          setKeyword={setKeyword}
          setCurrPage={setCurrPage}
        />
        <SearchPost
          keyword={keyword}
          setKeyword={setKeyword}
          setCategory={setCategory}
          page={page}
          setPage={setPage}
          setCurrPage={setCurrPage}
        />
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
        <Pagination
          page={page}
          setPage={setPage}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
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
  cursor: pointer;
`;

const StCommunityBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
`;

const StWritePost = styled.button`
  margin-left: 260px;
`;

export default PostList;
