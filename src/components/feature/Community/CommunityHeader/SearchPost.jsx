// 외부 모듈
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// 내부 모듈
import search from 'assets/images/search.svg';

function SearchPost() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const input = useRef(null);

  // eslint-disable-next-line consistent-return
  function onClickSearchRoom() {
    if (keyword.trim() === '') {
      return null;
    }
    // dispatch(searchPost(keyword));
    setKeyword('');
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      document.activeElement.blur();
      onClickSearchRoom();
      input.current.focus();
    }
  }

  return (
    <StSearchRoom>
      <input
        ref={input}
        placeholder="키워드로 게시글 검색이 가능하닭"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
      />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <SearchBtn onClick={onClickSearchRoom}>
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
    width: 700px;
    height: 60px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 32px;
    font-family: 'MapoBackpacking';
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
    margin-right: 10px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 20%;
  right: 6%;
  height: 30px;
`;

export default SearchPost;
