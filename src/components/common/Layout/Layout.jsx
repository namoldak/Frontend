import React from 'react';
import styled from 'styled-components';
import backImg from '../../../assets/img/backImg.svg';
import Container from './Container';

function Layout() {
  return (
    <StLayout>
      <Container />
    </StLayout>
  );
}

const StLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export default Layout;
