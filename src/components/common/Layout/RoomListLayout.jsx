import React from 'react';
import styled from 'styled-components';
import roomsBack from 'assets/images/roomsBack.png';
import roomsBackLaptop from 'assets/images/roomsBackLaptop.png';
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
  background-image: url(${roomsBack});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media ${(props) => props.theme.laptop} {
    background-image: url(${roomsBackLaptop});
  }
`;

export default RoomListLayout;
