// 외부 모듈
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { searchRoom } from '../../../../redux/modules/roomSlice';
import search from '../../../../assets/img/search.png';

function SearchRoom() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  function onClickSearchRoom() {
    dispatch(searchRoom(keyword));
    setKeyword('');
  }

  return (
    <StSearchRoom>
      <SearchInput
        placeholder="방 제목을 검색하닭"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
