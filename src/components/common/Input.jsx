import React from 'react';
import styled from 'styled-components';

function Input({ width, height, placeholder, onChange, value, type }) {
  return (
    <StyledInput
      width={width}
      height={height}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      // onFocus={onFocus}
    />
  );
}

export default Input;

const StyledInput = styled.input`
  width: ${(props) => props.width || '484px'};
  height: ${(props) => props.width || '64px'};
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
  outline: 7px solid ${({ theme }) => theme.colors.brown};
  border-radius: ${(props) => props.width || '50px'};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  text-indent: 16px;
  line-height: 22px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
  }
`;
