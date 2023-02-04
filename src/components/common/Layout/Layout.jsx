import React from 'react';
import styled from 'styled-components';
import pageBack from 'assets/images/pageBack.png';
import pageBackLaptop from 'assets/images/pageBackLaptop.png';
import usePreventGoBack from 'hooks/usePreventGoBack';
import Container from './Container';

function Layout() {
  usePreventGoBack();
  return (
    <StLayout>
      <Container />
    </StLayout>
  );
}

const StLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${pageBack});
  background-size: cover;
  background-repeat: no-repeat;

  @media ${(props) => props.theme.laptop} {
    background-image: url(${pageBackLaptop});
  }
`;

export default Layout;
