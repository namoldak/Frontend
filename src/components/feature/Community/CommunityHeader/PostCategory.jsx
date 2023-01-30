// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import select from 'assets/images/select.svg';
import { readAllPosts, readPostsByCategory } from 'redux/modules/postSlice';

function PostCategory({ page }) {
  const { totalPage, postCnt, postResponseDtoList } = useSelector(
    (state) => state.posts.posts,
  );
  console.log('cate', totalPage);
  console.log('cate posts', postResponseDtoList);
  console.log('props', page);

  const [category, setCategory] = useState('freeBoard');
  const [myFeebackPage, setMyFeedbackPage] = useState(0);
  const dispatch = useDispatch();

  function changeValue(target) {
    setCategory(target.target.value);
  }

  useEffect(() => {
    if (category === 'freeBoard') {
      dispatch(readAllPosts(page));
    } else {
      dispatch(readPostsByCategory(myFeebackPage));
    }
  }, [category]);

  return (
    <StPostCategory>
      <select onChange={changeValue}>
        <option value="freeBoard">자유 게시판</option>
        <option value="feedbackBoard">내가 쓴 피드백</option>
      </select>
    </StPostCategory>
  );
}

const StPostCategory = styled.div`
  position: relative;

  select {
    width: 240px;
    height: 60px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    border-radius: 10px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
    -webkit-appearance: none; /* for chrome */
    -moz-appearance: none; /*for firefox*/
    appearance: none;

    background-image: url(${select});
    background-repeat: no-repeat;
    background-position: 96% center;
    cursor: pointer;
  }

  select::-ms-expand {
    display: none; /*for IE10,11*/
  }
`;

const StArrow = styled.image`
  width: 20px;
  height: 30px;
`;

export default PostCategory;
