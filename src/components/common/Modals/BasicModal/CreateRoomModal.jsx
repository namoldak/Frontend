// 외부 모듈
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// 내부 모듈
import useToast from 'hooks/useToast';
import modalCreateBtn from 'assets/images/modalCreateBtn.svg';
import Input from 'components/common/Input/Input';
import { instance } from 'api/core/axios';
import useDebounce from 'hooks/useDebounce';

function CreateRoomModal() {
  const [gameRoomName, setGameRoomName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputCount, setInputCount] = useState(0);

  const onClickRoomCreate = useDebounce(async () => {
    const newRoom = { gameRoomName, gameRoomPassword: '1234' };
    if (gameRoomName.trim() === '') {
      useToast('방 제목을 입력해야 한닭', 'warning');
    } else {
      await instance
        .post(`/rooms`, newRoom)
        .then((res) => {
          sessionStorage.setItem('owner', res.data.owner);
          sessionStorage.setItem('normalEnter', true);
          navigate(`/gameroom/${res.data.roomId}`);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            useToast(`${error.response.data.message}`, 'error');
          } else {
            useToast('에러가 발생했닭! 다시 시도해야한닭!', 'error');
          }
        });
    }
  }, 300);

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      onClickRoomCreate();
      document.activeElement.blur();
    }
  }

  return (
    <StModalContainer onKeyUp={onKeyUpEnter}>
      <StTitle>방 만들기</StTitle>
      <Input
        placeholder="방 제목은 7글자 이하로 입력 가능하닭"
        value={gameRoomName}
        onChange={(e) => {
          setGameRoomName(e.target.value);
          setInputCount(e.target.value.length);
        }}
        maxLength={7}
      />
      <StLimit>{inputCount}/7</StLimit>
      <button onClick={onClickRoomCreate}>
        <img src={modalCreateBtn} alt="방 만들기" />
      </button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 60px;
  position: relative;

  input {
    width: 420px;
    margin-top: 50px;
    margin-bottom: 54px;
    font-weight: 800;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.06em;
  }

  input::placeholder {
    font-weight: 800;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.06em;
  }
`;

const StTitle = styled.div`
  font-size: 38px;
  font-weight: 900;
  line-height: 45px;
`;

const StLimit = styled.span`
  position: absolute;
  top: 116px;
  right: 80px;
  font-weight: 800;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text};
`;

export default CreateRoomModal;
