/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import arrow from 'assets/images/postLeftArrow.svg';
import { useSelector } from 'react-redux';

function Pagination({ setLimit, limit, page, setPage }) {
  const { totalPage } = useSelector((state) => state.posts.posts);

  const pageNumber = [];
  for (let i = 1; i <= totalPage; i += 1) {
    pageNumber.push(i);
  }

  const [currPage, setCurrPage] = useState(1);
  //   const num = currPage - (currPage % limit) + 1;
  //   console.log('num', pageNumber);

  return (
    <StPagination>
      {/* <button
        onClick={() => {
          setPage(0);
          setCurrPage(firstNum);
        }}
        disabled={page === 0}
      >
        &lt;&lt;/
      </button> */}
      <StArrowBtn
        onClick={() => {
          setPage(page - 1);
          setCurrPage(page - 2);
        }}
        disabled={page === 0}
      >
        <img src={arrow} alt="왼쪽 화살표" />
      </StArrowBtn>
      {/* <button onClick={() => setPage(num)}>{num}</button> */}
      {pageNumber &&
        pageNumber
          // .fill()
          .map((n) => {
            return (
              <StPageNum key={n + 1} onClick={() => setPage(n - 1)}>
                {n}
              </StPageNum>
            );
          })}
      <StArrowBtn
        onClick={() => {
          setPage(page + 1);
          setCurrPage(page + 2);
        }}
        disabled={page === totalPage - 1}
      >
        <img src={arrow} alt="오른쪽 화살표" className="right" />
      </StArrowBtn>
      {/* <button
        onClick={() => {
          setPage(totalPage - 1);
          setCurrPage(totalPage);
        }}
        disabled={page === totalPage - 1}
      >
        / &gt;&gt;
      </button> */}
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
  margin-left: 10px;
  margin-right: 10px;
`;

const StArrowBtn = styled.button`
  display: block;
  height: 18px;

  .right {
    rotate: 180deg;
  }
`;

export default Pagination;
