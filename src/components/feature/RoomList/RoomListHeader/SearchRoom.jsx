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
        placeholder="방 제목을 검색하닭"
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
    width: 913px;
    height: 70px;
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
  top: 23%;
  right: 4%;
`;

export default SearchRoom;
