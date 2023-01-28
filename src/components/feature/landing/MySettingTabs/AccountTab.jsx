/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import { removeCookie } from 'utils/cookies';
import { instance } from 'api/core/axios';
import accountTabBtn from 'assets/images/accountTabBtn.svg';
import Input from 'components/common/Input';
import Modal from 'components/common/Modals/BasicModal/Modal';
import DeleteAccountModal from 'components/common/Modals/BasicModal/DeleteAccountModal';

function AccountTab() {
  const [isModalOn, setIsModalOn] = useState(false);

  const [password, setPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  function onClickConfirm() {
    setIsModalOn(true);
  }

  async function onClickDeleteAccount() {
    instance
      .delete(`/auth/deleteMember`, { data: { password } })
      .then((response) => {
        removeCookie('my_token', 'nickname');
        setPassMsg(response.data.statusMsg);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          setPassMsg(error.response.data.statusMsg);
        } else {
          setPassMsg('오류가 발생했습니다. 다시 시도해주세요.');
        }
      });
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickDeleteAccount();
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          // onFocus={() => {
          //   setPassMsg('정말로 가는거닭?');
          // }}
          // onBlur={() => {
          //   setPassMsg('');
          // }}
        />
      </StInputBox>
      {/* <div style={{ height: '30px' }}>{passMsg}</div> */}
      {/* <StWithDraw onClick={onClickDeleteAccount}>
        <img src={withdraw} alt="탈퇴 진행하기" />
      </StWithDraw> */}
      <StWithDraw onClick={onClickConfirm}>
        <img src={accountTabBtn} alt="탈퇴 진행하기" />
      </StWithDraw>
      {isModalOn && (
        <Modal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<DeleteAccountModal />}
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

const StWithDraw = styled.button`
  width: 272px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
`;

export default AccountTab;
