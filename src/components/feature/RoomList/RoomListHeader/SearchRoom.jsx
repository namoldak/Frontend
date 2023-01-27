// 외부 모듈
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { searchRoom } from 'redux/modules/roomSlice';
import search from 'assets/images/search.svg';

function SearchRoom() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const input = useRef(null);

  // eslint-disable-next-line consistent-return
  function onClickSearchRoom() {
    if (keyword.trim() === '') {
      return null;
    }
    dispatch(searchRoom(keyword));
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
        placeholder="방 제목을 검색하라닭"
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

  input {
    width: 913px;
    height: 78px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 6px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 6px solid ${({ theme }) => theme.colors.brown};
    border-radius: 30px;
    font-weight: 700;
    font-size: 22px;
    line-height: 26px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 19px;
  right: 26px;
`;

export default SearchRoom;
