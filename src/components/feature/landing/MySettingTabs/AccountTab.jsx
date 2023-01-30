/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import accountTabBtn from 'assets/images/accountTabBtn.svg';
import Input from 'components/common/Input';
import Modal from 'components/common/Modals/BasicModal/Modal';
import DeleteAccountModal from 'components/common/Modals/BasicModal/DeleteAccountModal';
import useToast from 'hooks/useToast';

function AccountTab({ setting }) {
  const [isModalOn, setIsModalOn] = useState(false);
  const [input, setInput] = useState('');

  function onClickConfirm() {
    if (input === '') {
      useToast('비밀번호를 입력해주세요', 'warning');
    } else {
      setIsModalOn(true);
    }
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickConfirm();
    }
  }

  return (
    <StAccountTab onKeyUp={onKeyUpEnter}>
      <StText>
        하단의 비밀번호 입력 후, 탈퇴 버튼을 클릭 시 탈퇴 처리가 됩니다.
        <br />
        탈퇴가 진행이 되면, 게임을 이용할 수 없습니다. 탈퇴 시에는 이전에
        활동하신 업적은 사라지니 이 점 유의하시고 진행해주시기 바랍니다. 상기
        내용을 모두 확인하시고 이에 동의하면 탈퇴 해주시기 바랍니다.
      </StText>
      <hr />
      <StNotice>비밀번호를 입력해주세요</StNotice>
      <StInputBox>
        <Input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </StInputBox>
      <StConfirmBtn onClick={onClickConfirm}>
        <img src={accountTabBtn} alt="탈퇴 진행하기" />
      </StConfirmBtn>
      {isModalOn && (
        <Modal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<DeleteAccountModal input={input} setting={setting} />}
        />
      )}
    </StAccountTab>
  );
}

const StAccountTab = styled.div`
  font-weight: 500;
  font-size: 21px;
  line-height: 43px;
  letter-spacing: 0.08em;
  color: #ffffff;
`;

const StText = styled.div``;

const StNotice = styled.div`
  font-size: 26px;
  line-height: 42px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const StInputBox = styled.div`
  width: 100%;
  text-align: center;

  input {
    width: 430px;
    height: 50px;
  }
`;

const StConfirmBtn = styled.button`
  width: 272px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
`;

export default AccountTab;
