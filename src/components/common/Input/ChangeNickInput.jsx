// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// const ChangeNickInput = React.forwardRef((props, ref) => {
//   return (
//     <StChangeNickInput
//       {...props}
//       forwardedRef={ref}
//       placeholder="변경할 닉네임을 입력해주세요."
//     />
//   );
// });

function ChangeNickInput() {
  return <StChangeNickInput placeholder="변경할 닉네임을 입력해주세요." />;
}

const StChangeNickInput = styled.input`
  width: 198px;
  height: 36px;
  background: ${({ theme }) => theme.colors.paperGray};
  border-radius: 10px;
  margin: 0 14px 0 30px;
  color: ${({ theme }) => theme.colors.paperGray};
  font-weight: 200;
  font-size: 12px;
  line-height: 56px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text2};
  text-indent: 11px;

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
