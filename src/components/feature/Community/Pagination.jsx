/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import arrow from 'assets/images/postLeftArrow.svg';
import { useSelector } from 'react-redux';

function Pagination({ page, setPage, currPage, setCurrPage }) {
  const { totalPage } = useSelector((state) => state.posts.posts);

  return (
    <StPagination>
      <StArrowBtn
        onClick={() => {
          setPage(page - 1);
          setCurrPage(currPage - 1);
        }}
        disabled={page === 0}
      >
        <img src={arrow} alt="왼쪽 화살표" />
      </StArrowBtn>
      <StPageNum>
        {totalPage === 0 ? (
          <div>1/1</div>
        ) : (
          <div>
            {currPage} / {totalPage}
          </div>
        )}
      </StPageNum>
      <StArrowBtn
        onClick={() => {
          setPage(page + 1);
          setCurrPage(currPage + 1);
        }}
        disabled={page === totalPage - 1}
      >
        <img src={arrow} alt="오른쪽 화살표" className="right" />
      </StArrowBtn>
    </StPagination>
  );
}

const StPagination = styled.div`
  display: flex;
  height: 18px;
`;

const StPageNum = styled.button`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 12px;
  margin-right: 12px;
`;

const StArrowBtn = styled.button`
  display: block;
  height: 18px;

  .right {
    rotate: 180deg;
  }
`;

export default Pagination;
