// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import Card from './Card';

function CardList() {
  return (
    <div>
      <div>커뮤니티</div>
      <button>게시글 등록하기</button>
      <Card />
      <button>게시글 이동 버튼</button>
    </div>
  );
}

export default CardList;
