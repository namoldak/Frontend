// 외부 모듈
import React from 'react';
import styled from 'styled-components';

// 내부 모듈
import deleteAccount from 'assets/images/deleteAccount.svg';

function DeleteAccountModal() {
  return (
    <StDeleteAccountModal>
      <StTitle>정말로 가는거닭?</StTitle>
    </StDeleteAccountModal>
  );
}

const StDeleteAccountModal = styled.div``;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #321d07;
`;

export default DeleteAccountModal;
