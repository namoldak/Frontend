/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
// 외부 모듈
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 내부 모듈
import authAPI from 'api/authAsync';
import useDidMountEffect from 'hooks/useDidMountEffect';
import useToast from 'hooks/useToast';
import popUp from 'assets/images/popUp.svg';
import signUpTitleBtn from 'assets/images/signUpTitleBtn.svg';
import doubleCheckBtn from 'assets/images/doubleCheckBtn.svg';
import signUpBtn from 'assets/images/signUpBtn.svg';
import backBtn from 'assets/images/backBtn.svg';
import miniLoginBtn from 'assets/images/miniLoginBtn.svg';

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

function SignUp() {
  const navigate = useNavigate();
  const [nickValid, setNickValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  // const [pwValid, setPwValid] = useState(false);

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

  // console.log('nick error', errors.nickname);
  // console.log('nick check error', errors.nicknameCheck);
  // console.log('email error', errors.email);
  // console.log('email check error', errors.emailCheck);
  // console.log('pw error', errors.password);
  // console.log('confirm error', errors.confirmPw);

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
      console.log('e', response);
      if (response.data) {
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
      if (response.data) {
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
      // useToast('이미 사용 중인 닉네임입니다.', 'error');
      // setError('nickname', {
      //   type: 'custom',
      //   message: '이미 사용 중인 닉네임입니다.',
      // });
    } else {
      clearErrors('nickname', { type: 'custom' });
    }
  }, [nickValid]);

  useDidMountEffect(() => {
    if (emailValid) {
      // setError('email', {
      //   type: 'custom',
      // });
    } else {
      clearErrors('email', { type: 'custom' });
    }
  }, [emailValid]);

  return (
    <>
      <StBackBtn>
        <Link to="/">
          <img src={backBtn} alt="뒤로가기" />
        </Link>
      </StBackBtn>
      <StSignUp>
        <StSignUpContainer onSubmit={handleSubmit(onClickSignup)}>
          <StTitle>
            <img src={signUpTitleBtn} alt="회원가입" />
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
                <img src={doubleCheckBtn} alt="닉네임 중복확인" />
              </StDbCheckBtn>
            </StInputBox>
            <StToastMessage>
              {errors.nickname &&
                useToast(`${errors.nickname?.message}`, 'error')}
            </StToastMessage>
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
                <img src={doubleCheckBtn} alt="이메일 중복확인" />
              </StDbCheckBtn>
              <StToastMessage>
                {errors.emailCheck &&
                  useToast(`${errors.emailCheck?.message}`, 'error')}
              </StToastMessage>
            </StInputBox>
            {/* {errors.emailCheck?.message || errors.email?.message} */}
            <input
              className="pwInput"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', { required: true })}
            />
            <StToastMessage>
              {errors.password &&
                useToast(`${errors.password?.message}`, 'error')}
            </StToastMessage>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              {...register('confirmPw', { required: true })}
            />
            {/* <StToastMessage>
              {errors.confirmPw &&
                useToast(`${errors.confirmPw?.message}`, 'error')}
            </StToastMessage> */}
          </StInputCon>
          <StBtnBox>
            <StSignUpBtn type="submit" disabled={!isValid}>
              <img src={signUpBtn} alt="회원가입 버튼" />
            </StSignUpBtn>
            <StLogin>
              <p>아이디가 있으신가요?</p>
              <Link to="/login">
                <button>
                  <img src={miniLoginBtn} alt="로그인" />
                </button>
              </Link>
            </StLogin>
          </StBtnBox>
        </StSignUpContainer>
      </StSignUp>
    </>
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

const StToastMessage = styled.div`
  display: none;
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

  a {
    height: 40px;
  }

  button {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.paragraph};
    font-weight: 800;
    margin-left: -12px;
  }
`;

const StBackBtn = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  width: 78px;
  height: 78px;
`;

export default SignUp;
