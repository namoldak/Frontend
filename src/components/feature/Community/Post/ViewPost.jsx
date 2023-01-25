// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈

function ViewPost() {
  return (
    <StViewPost>
      <StViewTitle>제목입니닭</StViewTitle>
      <StViewBox>
        <StViewNickName>게시글 작성자</StViewNickName>
        <StViewCommentsCount>댓글 수 : 30</StViewCommentsCount>
      </StViewBox>
    </StViewPost>
  );
}

const StViewPost = styled.li`
  display: flex;
  align-items: center;
  height: 10vh;
  padding: 0 20px 0 20px;
  list-style: none;
  border-bottom: 1px solid #fff;
  font-size: 22px;
  color: #fff;
`;

const StViewTitle = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StViewBox = styled.div`
  display: flex;
  margin-left: auto;
`;

const StViewNickName = styled.p``;

const StViewCommentsCount = styled.p`
  margin-left: 20px;
`;

export default ViewPost;
