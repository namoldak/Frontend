import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import leftArrow from '../../../../assets/images/leftArrow.svg';

function ToLanding() {
  return (
    <StToLanding>
      <Link to="/">
        <ToLandingBtn>
          <img src={leftArrow} alt="leftArrow icon" />
        </ToLandingBtn>
      </Link>
    </StToLanding>
  );
}

const StToLanding = styled.div``;

const ToLandingBtn = styled.button`
  border: 0;
  background: none;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
  }
`;

export default ToLanding;
