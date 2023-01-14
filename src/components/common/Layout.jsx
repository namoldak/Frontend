import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import backImg from '../../assets/img/backImg.svg';

function Layout() {
  <StLayout>
    <Outlet />
  </StLayout>;
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
