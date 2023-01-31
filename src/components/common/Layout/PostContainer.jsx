import React from 'react';
import styled from 'styled-components';
import PostWrapper from './PostWrapper';

function Container() {
  return (
    <StContainer>
      <PostWrapper />
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 1180px; // 좌우 여백 370px
  height: 100vh;
  margin: 0 auto;
`;

export default Container;
