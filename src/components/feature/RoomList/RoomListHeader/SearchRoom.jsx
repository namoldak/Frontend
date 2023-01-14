// 외부 모듈
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { searchRoom } from '../../../../redux/modules/roomSlice';
import search from '../../../../assets/img/search.svg';

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
      <SearchInput
        ref={input}
        placeholder="방 제목을 검색하닭"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
      />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <SearchBtn disabled={!keyword} onClick={onClickSearchRoom}>
        <img src={search} alt="search icon" />
      </SearchBtn>
    </StSearchRoom>
  );
}

const StSearchRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.lightBrown};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
`;

const SearchBtn = styled.button`
  margin-left: 10px;
  border: 0;
  background: none;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;

export default SearchRoom;
