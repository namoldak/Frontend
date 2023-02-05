// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import select from 'assets/images/select.svg';

function PostCategory({ setCategory, setPage, setCurrPage, setKeyword }) {
  function changeValue(target) {
    setCategory(target.target.value);
    setPage(0);
    setCurrPage(1);
  }

  function onClickCategory(target) {
    setCategory(target.target.value);
    setKeyword('');
    setPage(0);
    setCurrPage(1);
  }

  return (
    <StPostCategory>
      <StSelect onChange={changeValue} onClick={onClickCategory}>
        <StOption value="freeBoard">자유 게시판</StOption>
        <StOption value="feedBackBoard">내가 쓴 피드백</StOption>
        <StOption value="myBoard">내가 쓴 게시글</StOption>
      </StSelect>
    </StPostCategory>
  );
}

const StPostCategory = styled.div`
  ${({ theme }) => theme.common.flexBetween}

  width: 205px;
  height: 54px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 6px solid ${({ theme }) => theme.colors.yellowBrown};
  border-radius: 10px;
  padding-left: 20px;

  background-image: url(${select}); // arrow
  background-repeat: no-repeat;
  background-position: 90% center;
`;

const StSelect = styled.select`
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none; // select 태그 기본 css reset
  border: 0;
  cursor: pointer;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.text3};
  background: transparent;

  &::-ms-expand {
    display: none; /*for IE10,11*/
  }

  &:focus {
    outline: none;
  }
`;

const StOption = styled.option`
  width: 100%;
`;

export default PostCategory;
