// 외부 모듈
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// 내부 모듈
import search from 'assets/images/search.svg';
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
    <StSearchRoom>
      <input
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
    </StSearchRoom>
  );
}

const StSearchRoom = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  input {
    width: 284px;
    height: 60px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    border-radius: 10px;
    font-family: 'MapoBackpacking';
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 30%;
  right: 6%;
  height: 23px;
`;

export default SearchPost;
