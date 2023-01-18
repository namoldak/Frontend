// 외부 모듈
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { searchRoom } from '../../../../redux/modules/roomSlice';
import Input from '../../../common/Input';
import search from '../../../../assets/images/search.svg';

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
      <Input
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
  position: relative;

  input {
    width: 913px;
    border-radius: 30px;
    margin-right: 10px;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 16%;
  right: 4%;
`;

export default SearchRoom;
