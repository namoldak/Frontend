/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 내부 모듈
import authAPI from '../../../api/authAsync';
import useDidMountEffect from '../../../hooks/useDidMountEffect';
import popUp from '../../../assets/images/popUp.svg';
import signUpTitleBtn from '../../../assets/images/signUpTitleBtn.svg';
import doubleCheckBtn from '../../../assets/images/doubleCheckBtn.svg';
import signUpBtn from '../../../assets/images/signUpBtn.svg';
import useToast from '../../../hooks/useToast';

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 2자리입니다')
    .max(16, '닉네임은 최대 16자리입니다')
    .matches(
      /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
      '닉네임은 한글, 영문, 숫자만 가능합니다.',
    )
    .required('닉네임을 인증해주세요'),
  email: yup
    .string()
    .email('올바른 이메일을 입력해주세요.')
    .required('이메일을 인증해주세요'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자리입니다')
    .max(16, '비밀번호는 최대 16자리입니다')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
      '공백을 제외한 특수문자, 알파벳, 숫자를 포함하여 입력해주세요',
    )
    .required('비밀번호를 입력해주세요'),
  confirmPw: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
    .required('비밀번호를 한번 더 입력해주세요'),
});

function Signup() {
  const navigate = useNavigate();
  const [nickValid, setNickValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // 유효성 검사
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

  // 회원가입 api
  async function onClickSignup(data) {
    await authAPI
      .SignUp(data)
      .then(
        useToast(
          '회원가입이 완료되었습니다. 다시 로그인 해 주세요.',
          'success',
        ),
        navigate('/login'),
      );
  }

  // 닉네임 중복확인
  function onClickCheckNickName() {
    const data = getValues('nickname');

    authAPI.checkNickName(data).then((response) => {
      if (response.data === false) {
        useToast('유효한 닉네임입니다.', 'success');
      } else {
        useToast('이미 사용 중인 닉네임입니다.', 'error');
      }
      setNickValid(response.data);
    });
  }

  // 이메일 중복 확인
  function onClickCheckEmail() {
    const data = getValues('email');
    authAPI.checkEmail(data).then((response) => {
      if (response.data === false) {
        useToast('유효한 이메일입니다.', 'success');
      } else {
        useToast('이미 사용중인 이메일입니다.', 'error');
      }
      setEmailValid(response.data);
    });
  }

  // 첫번째 렌더링 시 실행 안 됨
  useDidMountEffect(() => {
    if (nickValid) {
      useToast('이미 사용 중인 닉네임입니다.', 'error');
      //   setError('nickname', {
      //     type: 'custom',
      //     message: '이미 사용 중인 닉네임입니다.',
      //   });
    } else {
      clearErrors('nickname', { type: 'custom' });
    }
  }, [nickValid]);

  useDidMountEffect(() => {
    if (emailValid) {
      useToast('이미 사용 중인 이메일입니다.', 'error');
      //   setError('email', {
      //     type: 'custom',
      //     message: '이미 사용 중인 이메일입니다.',
      //   });
    } else {
      clearErrors('email', { type: 'custom' });
    }
  }, [emailValid]);

  return (
    <StSignUp>
      <StSignUpContainer onSubmit={handleSubmit(onClickSignup)}>
        <StTitle>
          <img src={signUpTitleBtn} alt="title_image" />
        </StTitle>
        <StInputCon>
          <StInputBox>
            <input
              placeholder="닉네임을 입력해주세요."
              {...register('nickname', { required: true })}
            />
            <StDbCheckBtn
              disabled={errors.nickname || !getValues('nickname')}
              onClick={onClickCheckNickName}
            >
              <img src={doubleCheckBtn} alt="double_check" />
            </StDbCheckBtn>
          </StInputBox>
          {/* <HelpText>
            {errors.nicknameCheck?.message || errors.nickname?.message}
          </HelpText> */}
          <StInputBox>
            <input
              className="emailInput"
              placeholder="이메일을 입력해주세요"
              {...register('email', { required: true })}
            />
            <StDbCheckBtn
              disabled={errors.email || !getValues('email')}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={onClickCheckEmail}
            >
              <img src={doubleCheckBtn} alt="double_check" />
            </StDbCheckBtn>
          </StInputBox>
          {/* <HelpText>
            {errors.emailCheck?.message || errors.email?.message}
          </HelpText> */}
          <input
            className="pwInput"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', { required: true })}
          />
          {/* <HelpText>{errors.password?.message}</HelpText> */}
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('confirmPw', { required: true })}
          />
          {/* <HelpText>{errors.confirmPw?.message}</HelpText> */}
        </StInputCon>
        <StBtnBox>
          <StSignUpBtn type="submit">
            <img src={signUpBtn} alt="signUp_image" />
          </StSignUpBtn>
          <StLogin>
            <p>아이디가 있으신가요?</p>
            <Link to="/login">
              <button>로그인</button>
            </Link>
          </StLogin>
        </StBtnBox>
      </StSignUpContainer>
    </StSignUp>
  );
}

const StSignUp = styled.div`
  ${({ theme }) => theme.common.absoluteCenter}
  width: 942px;
  height: 700px;
  background-image: url(${popUp});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StSignUpContainer = styled.form`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 100%;
  text-align: center;
`;

const StTitle = styled.div`
  width: 284px;
  height: 88px;
  margin-bottom: 30px;
`;

const StInputCon = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  input {
    width: 528px;
    height: 54px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 32px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
  .pwInput {
    margin-bottom: 24px;
  }
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 337px;
  }
  .emailInput {
    margin-top: 20px;
    margin-bottom: 24px;
  }
`;

const StDbCheckBtn = styled.button`
  width: 173px;
  height: 64px;
  margin-left: 18px;
`;

const StBtnBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const StSignUpBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 11px;
`;

const StLogin = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.paragraph};
  font-weight: 500;
  line-height: 22px;
  button {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.paragraph};
    font-weight: 800;
    margin-left: 10px;
  }
`;

export default Signup;
