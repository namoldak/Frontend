import React from 'react';
import styled from 'styled-components';
import search from '../../../../assets/img/search.png';

function SearchRoom() {
  return (
    <StSearchRoom>
      <SearchInput />
      <SearchBtn>
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
