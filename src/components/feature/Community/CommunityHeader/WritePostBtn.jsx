// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈

function WritePostBtn() {
  return (
    <Link to="/posts/write">
      <CreatePostBtn>
        <p>게시글 작성하기</p>
      </CreatePostBtn>
    </Link>
  );
}

const CreatePostBtn = styled.button`
  font-size: 22px;
  color: #fff;
`;

export default WritePostBtn;
