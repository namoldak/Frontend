import React from 'react';
import styled from 'styled-components';
import backImg2 from 'assets/images/backImg2.png';
import Container from './Container';

function RoomListLayout() {
  return (
    <StLayout>
      <Container />
    </StLayout>
  );
}

const StLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backImg2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export default RoomListLayout;
