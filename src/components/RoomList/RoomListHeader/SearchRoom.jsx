// 외부 모듈
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { readAllRooms, searchRoom } from 'redux/roomSlice';
import search from 'assets/images/search.svg';
import smallClose from 'assets/images/smallClose.svg';
import Input from 'components/common/Input/Input';

function SearchRoom({ page, setPage, keyword, setKeyword }) {
  const dispatch = useDispatch();
  const input = useRef(null);

  function onClickSearchRoom() {
    if (keyword.trim() === '') {
      return null;
    }
    setPage(0);
    dispatch(searchRoom({ keyword, page: 0 }));
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      onClickSearchRoom();
    }
  }

  function onClickResetKeyword() {
    setKeyword('');
    dispatch(readAllRooms(page));
  }

  return (
    <StSearchRoom>
      <Input
        ref={input}
        placeholder="방 제목으로 검색이 가능하닭"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
      />
      {keyword === '' ? (
        <SearchBtn onClick={onClickSearchRoom}>
          <img src={search} alt="검색버튼" />
        </SearchBtn>
      ) : (
        <CloseBtn onClick={onClickResetKeyword}>
          <img src={smallClose} alt="검색 초기화" />
        </CloseBtn>
      )}
    </StSearchRoom>
  );
}

const StSearchRoom = styled.div`
  position: relative;
  margin-left: 6px;

  input {
    width: 901px;
    height: 72px;
    border: 6px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 6px solid ${({ theme }) => theme.colors.brown};
    font-weight: 700;
    font-size: 22px;
    color: ${({ theme }) => theme.colors.text2};
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.8));
  }
  input::placeholder {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text2};
  }

  @media ${(props) => props.theme.laptop} {
    input {
      width: 692px;
      height: 68px;
    }
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 17px;
  right: 22px;

  @media ${(props) => props.theme.laptop} {
    top: 14px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 25px;
  right: 26px;

  @media ${(props) => props.theme.laptop} {
    top: 20px;
  }
`;

export default SearchRoom;
