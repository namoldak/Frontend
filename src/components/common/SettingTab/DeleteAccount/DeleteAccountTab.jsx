// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import accountTabBtn from 'assets/images/accountTabBtn.svg';
import kakaoDelelteBtn from 'assets/images/kakaoDeleteBtn.svg';
import Input from 'components/common/Input/Input';
import Modal from 'components/common/Modals/BasicModal/Modal';
import DeleteAccountModal from 'components/common/Modals/BasicModal/DeleteAccountModal';
import useToast from 'hooks/useToast';
import DeleteKaKaoAccountModal from 'components/common/Modals/BasicModal/DeleteKaKaoAccountModal';

function DeleteAccountTab({ setting }) {
  const [isModalOn, setIsModalOn] = useState(false);
  const [isKakaoModalOn, setIsKakaoModalOn] = useState(false);
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

  function onClickKakao() {
    setIsKakaoModalOn(true);
  }

  return (
    <StAccountTab onKeyUp={onKeyUpEnter}>
      <StText>
        하단의 비밀번호 입력 후, 탈퇴 버튼을 클릭 시 탈퇴 처리가 됩니다.
        <br />
        탈퇴가 진행이 되면, 게임을 이용할 수 없습니다.
        <br />
        상기 내용을 모두 확인하시고 이에 동의하면 탈퇴 해주시기 바랍니다.
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
      <StKakaoBox>
        카카오로 가입하셨다면
        <KakaoAccount
          role="presentation"
          onClick={onClickKakao}
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          <img src={kakaoDelelteBtn} alt="카카오 탈퇴하기" />
        </KakaoAccount>
      </StKakaoBox>
      {isKakaoModalOn && (
        <Modal
          onClose={() => {
            setIsKakaoModalOn(false);
          }}
          content={<DeleteKaKaoAccountModal setting={setting} />}
        />
      )}
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
  font-size: 18px;
  line-height: 43px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.white};
`;

const StText = styled.div``;

const StNotice = styled.div`
  font-size: 22px;
  line-height: 42px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
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
  margin-top: 20px;
`;

const StKakaoBox = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 22px;
  line-height: 42px;
  text-align: center;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 17px;
`;

const KakaoAccount = styled.button`
  margin-left: 10px;
`;

export default DeleteAccountTab;
