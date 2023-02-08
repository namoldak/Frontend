// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import authAPI from 'api/authAsync';
import useDidMountEffect from 'hooks/useDidMountEffect';
import useToast from 'hooks/useToast';
import ChangeNickInput from 'components/common/Input/ChangeNickInput';
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

function ChangeNickV2({ setting }) {
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
            useToast('닉네임이 변경되었습니닭!', 'success');
            setTimeout(() => {
              setting(false);
            }, 5000);
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

  // const ref = React.createRef();

  return (
    <StChangeNick>
      <StChangeNickBox>
        <StInputBox>
          <StChangeNickInput
            // <ChangeNickInput
            // ref={ref}
            {...register('nickname', { required: true })}
          />
          {errors.nickname?.message && (
            <HelpText>
              <img src={check} alt="체크" />
              {errors.nickname?.message}
            </HelpText>
          )}
        </StInputBox>
        <ChangeNickName
          type="submit"
          disabled={!isValid}
          onClick={onClickCheckName}
        >
          닉네임 변경
        </ChangeNickName>
      </StChangeNickBox>
    </StChangeNick>
  );
}

const StChangeNick = styled.form`
  margin-bottom: 24px;
`;

const StChangeNickBox = styled.div`
  display: flex;
`;

const StInputBox = styled.div`
  position: relative;
`;

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
  margin-left: 56px;

  img {
    width: 18px;
    margin-right: 6px;
  }
`;

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

export default ChangeNickV2;
