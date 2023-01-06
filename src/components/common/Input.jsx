import React from 'react';
import styled from 'styled-components';

function Input({ type, placeholder, onChange, value, width }) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      width={width}
    />
  );
}

const StyledInput = styled.input`
  width: ${(props) => props.width || '400px'};
  height: 30px;
  font-size: 18px;
  text-indent: 10px;
  border: 2px solid rgba(55, 55, 55, 0.5);
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: #ffd440;
  }
`;

export default Input;
