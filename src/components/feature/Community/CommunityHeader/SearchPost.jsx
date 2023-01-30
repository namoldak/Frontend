/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import search from 'assets/images/postSearch.svg';
import smallClose from 'assets/images/smallClose.svg';
import { searchPosts } from 'redux/modules/postSlice';

function SearchPost({ keyword, setKeyword, page, setPage, setCategory }) {
  const dispatch = useDispatch();
  const input = useRef(null);

  function onClickSearchPost() {
    if (keyword.trim() === '') {
      return null;
    }
    setPage(0);
    dispatch(searchPosts({ keyword, page }));
    setCategory('search');
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      document.activeElement.blur();
      onClickSearchPost();
      input.current.focus();
    }
  }

  function resetKeyword() {
    setKeyword('');
    setCategory('freeBoard');
  }

  return (
    <StSearchPost>
      <StPostInput
        ref={input}
        placeholder="키워드로 검색이 가능하닭."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
      />
      {keyword === '' ? (
        <SearchBtn onClick={onClickSearchPost}>
          <img src={search} alt="검색버튼" />
        </SearchBtn>
      ) : (
        <SearchBtn onClick={resetKeyword}>
          <img src={smallClose} alt="검색 초기화" />
        </SearchBtn>
      )}
    </StSearchPost>
  );
}

const StSearchPost = styled.div`
  position: relative;
`;

const StPostInput = styled.input`
  width: 284px;
  height: 54px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 6px solid ${({ theme }) => theme.colors.yellowBrown};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text3};
  font-weight: 300;
  line-height: 19px;
  letter-spacing: 0.1em;
  text-indent: 15px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text3};
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0.1em;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  height: 24px;
`;

export default SearchPost;
