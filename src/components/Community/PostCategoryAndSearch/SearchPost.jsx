// 외부 모듈
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// 내부 모듈
import search from 'assets/images/postSearch.svg';
import smallClose from 'assets/images/smallClose.svg';
import { searchPosts } from 'redux/postSlice';
import Input from 'components/common/Input/Input';

function SearchPost({ keyword, setKeyword, page, setPage, setCurrPage }) {
  const dispatch = useDispatch();

  function onClickSearchPost() {
    if (keyword.trim() === '') {
      return null;
    }
    setPage(0);
    setCurrPage(1);
    dispatch(searchPosts({ keyword, page }));
  }

  function onKeyUpEnter(event) {
    if (event.keyCode === 13) {
      onClickSearchPost();
    }
  }

  function onClickResetKeyword() {
    setKeyword('');
  }

  return (
    <StSearchPost>
      <Input
        placeholder="키워드로 검색이 가능하닭."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpEnter}
      />
      {keyword === '' ? (
        <SearchBtn onClick={onClickSearchPost}>
          <img src={search} alt="검색버튼" />
        </SearchBtn>
      ) : (
        <CloseBtn onClick={onClickResetKeyword}>
          <img src={smallClose} alt="검색 초기화" />
        </CloseBtn>
      )}
    </StSearchPost>
  );
}

const StSearchPost = styled.div`
  position: relative;

  input {
    width: 284px;
    height: 54px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text3};
    font-weight: 300;
    line-height: 19px;
    letter-spacing: 0.1em;
    text-indent: 15px;
    outline: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text3};
      font-family: CoreDream;
    }
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  height: 24px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 15px;
  height: 20px;
`;

export default React.memo(SearchPost);
