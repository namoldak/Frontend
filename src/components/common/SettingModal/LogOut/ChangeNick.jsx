// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from 'components/common/Modals/BasicModal/Modal';
import ChangeNameModal from 'components/common/Modals/BasicModal/ChangeNameModal';

function ChangeNick({ setting }) {
  const [isModalOn, setIsModalOn] = useState(false);
  function onClickChange() {
    setIsModalOn(true);
  }
  return (
    <StChangeNick>
      <StChangeNickBox>
        <ChangeNickName onClick={onClickChange}>닉네임 변경</ChangeNickName>
        {isModalOn && (
          <Modal
            onClose={() => {
              setIsModalOn(false);
            }}
            content={<ChangeNameModal setting={setting} />}
          />
        )}
      </StChangeNickBox>
    </StChangeNick>
  );
}

const StChangeNick = styled.div`
  margin-bottom: 24px;
`;

const StChangeNickBox = styled.div``;

const ChangeNickName = styled.button`
  width: 120px;
  height: 36px;
  background: ${({ theme }) => theme.colors.lightBrown};
  ${({ theme }) => theme.common.border};
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.22em;
  color: ${({ theme }) => theme.colors.white};
`;

export default ChangeNick;
