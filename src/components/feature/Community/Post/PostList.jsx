/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import {
  readAllPosts,
  readPostsByCategory,
  searchPosts,
} from 'redux/modules/postSlice';
import settingBack from 'assets/images/settingBack.png';
import postMy from 'assets/images/postMy.svg';
import postWrite from 'assets/images/postWrite.svg';
import Pagination from '../Pagination';
import CommunityTopBar from '../CommunityHeader/CommunityTopBar';
import Post from './Post';
import PostCategory from '../CommunityHeader/PostCategory';
import SearchPost from '../CommunityHeader/SearchPost';

function PostList() {
  const { totalPage, postCnt, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );

  const [page, setPage] = useState(0);
  console.log('list page', page);
  const [limit, setLimit] = useState(5);

  const [category, setCategory] = useState('freeBoard');
  console.log('list cate', category);
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();

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
    <StPostList>
      <CommunityTopBar />
      <StCommunityCon>
        <StCommunityBack>
          <StBlackBack>
            <StCategoryAndSearch>
              <PostCategory
                setCategory={setCategory}
                page={page}
                setPage={setPage}
              />
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
          </StBlackBack>
        </StCommunityBack>
      </StCommunityCon>
    </StPostList>
  );
}

const StPostList = styled.div`
  padding-top: 85px;
`;

const StCommunityCon = styled.div`
  padding-top: 38px;
`;

const StCommunityBack = styled.div`
  height: calc(100vh - 166px);
  background-image: url(${settingBack});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const StBlackBack = styled.div`
  width: 1004px;
  height: 590px;
  background-color: rgba(4, 2, 0, 0.8);
  border-radius: 30px;
  padding: 40px 35px 40px 35px;
`;

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
`;

const StMyPost = styled.button``;

const StWritePost = styled.button``;

const StLeftBtn = styled.button`
  display: block;
  height: 18px;
`;

const StRightBtn = styled.button`
  display: block;
  height: 18px;
`;

const StEmptyDiv = styled.div`
  height: 50px;
`;

export default PostList;
