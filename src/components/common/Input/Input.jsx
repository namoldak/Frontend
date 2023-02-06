// 외부 모듈
import React from 'react';
import styled from 'styled-components';

function Input({
  width,
  height,
  placeholder,
  onChange,
  value,
  type,
  maxLength,
}) {
  return (
    <StInput
      width={width}
      height={height}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      maxLength={maxLength}
      // onFocus={onFocus}
    />
  );
}

export default Input;

const StInput = styled.input`
  width: ${(props) => props.width || '484px'};
  height: ${(props) => props.width || '64px'};
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
  outline: 4px solid ${({ theme }) => theme.colors.brown};
  border-radius: ${(props) => props.width || '30px'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 200;
  line-height: 19px;
  letter-spacing: 0.06em;
  text-indent: 17px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.06em;
  }
`;
