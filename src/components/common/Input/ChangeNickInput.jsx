// 외부 모듈
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const ChangeNickInput = forwardRef(({ placeholder, ...rests }, ref) => {
  return <StChangeNickInput placeholder={placeholder} ref={ref} {...rests} />;
});

const StChangeNickInput = styled.input`
  width: 198px;
  height: 36px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 10px;
  margin: 0 14px 0 30px;
  font-weight: 200;
  font-size: 12px;
  line-height: 56px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text2};
  text-indent: 11px;
  border: 0;

  ::placeholder {
    font-weight: 200;
    font-size: 12px;
    line-height: 56px;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.text2};
  }

  :focus {
    outline: none;
  }
`;

export default ChangeNickInput;
