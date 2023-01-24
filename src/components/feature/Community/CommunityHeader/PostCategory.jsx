// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import select from 'assets/images/select.png';
import { useSelector } from 'react-redux';

function PostCategory() {
  const posts = useSelector((state) => state.posts.posts);
  console.log('posts', posts);

  return (
    <StPostCategory>
      <select>
        <option value="전체보기">전체 보기</option>
        <option value="자유게시판">자유 게시판</option>
        <option value="유저피드백">유저 피드백</option>
      </select>
    </StPostCategory>
  );
}

const StPostCategory = styled.div`
  margin-right: auto;
  margin-left: 20px;
  position: relative;

  select {
    width: 240px;
    height: 60px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 32px;
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
    padding-right: 10px;
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
