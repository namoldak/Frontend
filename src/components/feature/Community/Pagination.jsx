/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';

function Pagination({ totalPage, page, setPage }) {
  const firstNum = page - (totalPage % 5) + 1;
  console.log('page', page);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 0}
        >
          이전
        </button>
        {Array(4)
          .fill()
          .map((_, i) => {
            return (
              <button
                border="true"
                key={i}
                onClick={() => {
                  setPage(firstNum + i);
                }}
                aria-current={page === firstNum + i ? 'page' : null}
              >
                {firstNum + 1 + i}
              </button>
            );
          })}
        ;
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          //   disabled={page === totalPage}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Pagination;
