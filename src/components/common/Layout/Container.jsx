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
  min-width: 1180px;
  height: 100vh;
  margin: 0 auto;
  width: 1180px;
  border: 1px solid black;
`;

export default Container;
