// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈

function Button({ width, height, color, children, onClick }) {
  return (
    <StButton width={width} height={height} color={color} onClick={onClick}>
      <span>{children}</span>
    </StButton>
  );
}

const StButton = styled.button`
  display: inline-block;
  position: relative;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'fit-content'};

  padding: 5px 10px;

  border: 1px solid rgba(55, 55, 55, 0.5);
  border-radius: 10px;
  box-shadow: 1px 3px gray;
  color: ${(props) => props.color || '#757575'};

  font-size: 14px;

  transition-duration: 0.1s;
  .img {
    width: 100%;
  }
  &:active {
    box-shadow: 0 1px rgba(200, 200, 200, 0.2);
    top: 2px;
  }
`;

export default Button;
