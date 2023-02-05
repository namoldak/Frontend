// 외부 모듈
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// 내부 모듈
import { searchRoom } from 'redux/roomSlice';
import search from 'assets/images/search.svg';
import smallClose from 'assets/images/smallClose.svg';

function SearchRoom({ page, setPage, keyword, setKeyword, setIsSearch }) {
  const dispatch = useDispatch();
  const input = useRef(null);

  function onClickSearchRoom() {
    if (keyword.trim() === '') {
      return null;
    }
    setPage(0);
    dispatch(searchRoom({ keyword, page }));
    setIsSearch(true);
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      document.activeElement.blur();
      onClickSearchRoom();
      input.current.focus();
    }
  }

  function onClickResetKeyword() {
    setKeyword('');
    setIsSearch(false);
  }

  return (
    <StSearchRoom>
      <input
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

  @media ${(props) => props.theme.laptop} {
    input {
      width: 692px;
      height: 68px;
    }
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 19px;
  right: 26px;

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
