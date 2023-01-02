// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈

function TextButton({ width, height, children, fontsize, onClick, margin }) {
  return (
    <TextClick
      width={width}
      height={height}
      fontsize={fontsize}
      onClick={onClick}
      margin={margin}
    >
      <span>{children}</span>
    </TextClick>
  );
}

const TextClick = styled.button`
  position: relative;
  border: none;
  text-decoration: none;
  background-color: transparent;
  color: #453b3b;

  font-size: ${(props) => props.fontSize || '18px'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};

  padding: 5px;

  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default TextButton;
