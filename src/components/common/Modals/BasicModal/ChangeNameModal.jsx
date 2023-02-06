// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import authAPI from 'api/authAsync';
import useDidMountEffect from 'hooks/useDidMountEffect';
import useToast from 'hooks/useToast';
import changeNick from 'assets/images/changeNick.svg';
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
  const [nickValid, setNickValid] = useState(false);

  const {
    register,
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

        const newNick = { nickname: data };
        instance.put('/auth/changeNickname', newNick).then((res) => {
          if (res.status === 200) {
            setNicknameCookie(newNick.nickname);
            setTimeout(() => {
              setting(false);
            }, 5000);
            useToast('닉네임이 변경되었습니닭!', 'success');
          }
        });
      } else {
        useToast('이미 사용 중인 닉네임입니다.', 'error');
      }
      setNickValid(response.data);
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
    <StChangeNameModal>
      <StTitle>새로운 닉네임을 설정할 수 있닭!</StTitle>
      <StInputBox>
        <input
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', { required: true })}
        />
        {errors.nickname?.message && (
          <HelpText>
            <img src={check} alt="체크" />
            {errors.nickname?.message}
          </HelpText>
        )}
      </StInputBox>
      <ChangeNameBtn
        type="submit"
        disabled={!isValid}
        onClick={onClickCheckName}
      >
        <img src={changeNick} alt="닉네임 변경" />
      </ChangeNameBtn>
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
  margin: 30px 0 40px 0;

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

const HelpText = styled.div`
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
  margin-left: 30px;

  img {
    width: 18px;
    margin-right: 6px;
  }
`;

const ChangeNameBtn = styled.button`
  width: 200px;
`;

export default ChangeNameModal;
