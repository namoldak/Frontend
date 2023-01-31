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
  /* padding-top: 20px; */
  @media ${(props) => props.theme.laptop} {
    width: 1080px;
  }
`;

export default Container;
