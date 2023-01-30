// 외부 모듈
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// 내부 모듈
import search from 'assets/images/postSearch.svg';
import { searchPosts } from 'redux/modules/postSlice';

function SearchPost() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const input = useRef(null);

  // eslint-disable-next-line consistent-return
  function onClickSearchPost() {
    if (keyword.trim() === '') {
      return null;
    }
    console.log('key', keyword);
    dispatch(searchPosts(keyword));
    setKeyword('');
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      document.activeElement.blur();
      onClickSearchPost();
      input.current.focus();
    }
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
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <SearchBtn onClick={onClickSearchPost}>
        <img src={search} alt="검색버튼" />
      </SearchBtn>
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
