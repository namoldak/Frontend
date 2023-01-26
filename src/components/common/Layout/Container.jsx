import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Container() {
  return (
    <StContainer>
      <Outlet />
    </StContainer>
  );
}

const StContainer = styled.div`
  /* min-width: 1180px;
  height: 100vh; */
  margin: 0 auto;
  width: 1180px; // 좌우 여백 370px
  padding-top: 20px;
`;

export default Container;
