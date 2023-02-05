/* eslint-disable react/jsx-props-no-spreading */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import authAPI from 'api/authAsync';
import useDidMountEffect from 'hooks/useDidMountEffect';
import useToast from 'hooks/useToast';
import changeNick from 'assets/images/changeNick.svg';
import doubleCheckBtn from 'assets/images/doubleCheckBtn.svg';
import { instance } from 'api/core/axios';
import { setNicknameCookie } from 'utils/cookies';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import check from 'assets/images/check.svg';

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 2자리입니다')
    .max(6, '닉네임은 최대 6자리입니다')
    .matches(
      /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
      '닉네임은 한글, 영문, 숫자만 가능합니다.',
    )
    .required('닉네임을 인증해주세요'),
});

function ChangeNameModal({ setting }) {
  const [input, setInput] = useState('');
  const [nickValid, setNickValid] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  // 닉네임 중복확인
  async function onClickCheckName(event) {
    event.preventDefault();
    const data = getValues('nickname');

    await authAPI.checkNickName(data).then((response) => {
      if (response.data) {
        useToast('유효한 닉네임입니다.', 'success');
      } else {
        useToast('이미 사용 중인 닉네임입니다.', 'error');
      }
      setNickValid(response.data);
    });
  }

  function onEventPrevent(event) {
    event.preventDefault();
  }

  // 닉네임 변경
  async function onChangeName(data) {
    if (nickValid === false) {
      useToast('닉네임 중복 확인을 해주세요.', 'warning');
      return;
    }

    await instance.put('/auth/changeNickname', data).then((res) => {
      if (res.status === 200) {
        setNicknameCookie(data.nickname);
        useToast('닉네임이 변경되었습니닭!', 'success');
        setTimeout(() => {
          setting(false);
        }, 3000);
      }
    });
  }

  useDidMountEffect(() => {
    if (!nickValid) {
      setError('nickname', {
        type: 'custom',
      });
    } else {
      clearErrors('nickname', { type: 'custom' });
    }
  }, [nickValid]);

  return (
    <StChangeNameModal onSubmit={handleSubmit(onChangeName, onEventPrevent)}>
      <StTitle>새로운 닉네임을 설정할 수 있닭!</StTitle>
      <StInputBox>
        <input
          // value={input}
          // onChange={(e) => {
          //   setInput(e.target.value);
          // }}
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', { required: true })}
        />
        <StDbCheckBtn
          disabled={errors.nickname || !nickValid}
          onClick={onClickCheckName}
        >
          <img src={doubleCheckBtn} alt="닉네임 중복확인" />
        </StDbCheckBtn>
        {errors.nickname?.message && (
          <StHelpText>
            <img src={check} alt="체크" />
            {errors.nickname?.message}
          </StHelpText>
        )}
      </StInputBox>
      <StChangeNameBtn type="submit" disabled={!isValid}>
        <img src={changeNick} alt="닉네임 변경" />
      </StChangeNameBtn>
    </StChangeNameModal>
  );
}

const StChangeNameModal = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 108px;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
`;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.04em;
`;

const StInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px 0;

  input {
    width: 240px;
    height: 54px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 4px solid ${({ theme }) => theme.colors.brown};
    border-radius: 30px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 200;
    line-height: 19px;
    letter-spacing: 0.06em;
    text-indent: 17px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.06em;
  }
`;

const StDbCheckBtn = styled.button`
  height: 60px;
  margin-left: 16px;
  margin-bottom: 6px;
`;

const StHelpText = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: -20px;
  bottom: -28px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
  width: 454px;
  margin-left: 40px;

  img {
    width: 18px;
    margin-right: 6px;
  }
`;

const StChangeNameBtn = styled.button`
  width: 200px;
`;

export default ChangeNameModal;
