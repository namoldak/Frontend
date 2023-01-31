import React from 'react';
import styled from 'styled-components';
import CommunityWrapper from './CommunityWrapper';

function CommunityContainer() {
  return (
    <StCommunityContainer>
      <CommunityWrapper />
    </StCommunityContainer>
  );
}

const StCommunityContainer = styled.div`
  width: 1180px; // 좌우 여백 370px
  height: 100vh;
  margin: 0 auto;
`;

export default CommunityContainer;
