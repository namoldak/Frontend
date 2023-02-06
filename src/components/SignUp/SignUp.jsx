/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
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
    if (nickValid === false && emailValid === false) {
      useToast('닉네임과 이메일 모두 중복 확인을 해주세요.', 'warning');
      return;
    }
    if (nickValid === false && emailValid === true) {
      useToast('닉네임 중복 확인을 해주세요.', 'warning');
      return;
    }
    if ((nickValid === true && emailValid) === false) {
      useToast('이메일 중복 확인을 해주세요.', 'warning');
      return;
    }

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
  function onClickCheckNickName(event) {
    event.preventDefault();
    const data = getValues('nickname');

    authAPI.checkNickName(data).then((response) => {
      if (response.data) {
        useToast('유효한 닉네임입니다.', 'success');
      } else {
        useToast('이미 사용 중인 닉네임입니다.', 'error');
      }
      setNickValid(response.data);
    });
  }

  // 이메일 중복 확인
  function onClickCheckEmail(event) {
    event.preventDefault();
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

  useDidMountEffect(() => {
    if (nickValid) {
      setError('nickname', {
        type: 'custom',
      });
    } else {
      clearErrors('nickname', { type: 'custom' });
    }
  }, [nickValid]);

  useDidMountEffect(() => {
    if (emailValid) {
      setError('email', {
        type: 'custom',
      });
    } else {
      clearErrors('email', { type: 'custom' });
    }
  }, [emailValid]);

  return (
    <StSignUp>
      <StBackBtn>
        <Link to="/" draggable="false">
          <img src={backBtn} alt="뒤로가기" />
        </Link>
      </StBackBtn>
      <StSignUpWrapper>
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
              {errors.nickname?.message && (
                <StHelpText className="nickText">
                  <img src={check} alt="체크" />
                  {errors.nickname?.message}
                </StHelpText>
              )}
            </StInputBox>
            <StInputBox className="emailBox">
              <input
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
              {errors.email?.message && (
                <StHelpText>
                  <img src={check} alt="체크" />
                  {errors.email?.message}
                </StHelpText>
              )}
            </StInputBox>
            <StPwInputBox>
              <input
                className="pwInput"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register('password', { required: true })}
              />
              {errors.password?.message && (
                <StHelpText>
                  <img src={check} alt="체크" />
                  {errors.password?.message}
                </StHelpText>
              )}
            </StPwInputBox>
            <StCfPwInputBox>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                {...register('confirmPw', { required: true })}
              />
              {errors.confirmPw?.message && (
                <StHelpText>
                  <img src={check} alt="체크" />
                  {errors.confirmPw?.message}
                </StHelpText>
              )}
            </StCfPwInputBox>
          </StInputCon>
          <StBtnBox>
            <StSignUpBtn type="submit" disabled={!isValid}>
              <img src={signUpBtn} alt="회원가입 버튼" />
            </StSignUpBtn>
            <StLogin>
              <p>아이디가 있으신가요?</p>
              <Link to="/login" draggable="false">
                <button>
                  <img src={miniLoginBtn} alt="로그인" />
                </button>
              </Link>
            </StLogin>
          </StBtnBox>
        </StSignUpContainer>
      </StSignUpWrapper>
    </StSignUp>
  );
}

const StSignUp = styled.div`
  padding-top: 72px;

  @media ${(props) => props.theme.laptop} {
    padding-top: 30px;
  }
`;

const StBackBtn = styled.button`
  width: 78px;
`;

const StSignUpWrapper = styled.div`
  width: 942px;
  height: 694px;
  background-image: url(${popUp});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: 44px;

  @media ${(props) => props.theme.laptop} {
    margin-top: 22px;
  }
`;

const StSignUpContainer = styled.form`
  padding-top: 68px;

  input {
    width: 454px;
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

const StTitle = styled.div`
  width: 256px;
  height: 80px;
  margin: 0 auto;
`;

const StInputCon = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 22px;
`;

const StInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 307px;
  }

  &.emailBox {
    margin-top: 34px;
    margin-bottom: 34px;
  }
`;

const StPwInputBox = styled.div`
  position: relative;
  margin-bottom: 34px;
`;

const StCfPwInputBox = styled.div`
  position: relative;
`;

const StDbCheckBtn = styled.button`
  width: 131px;
  height: 54px;
  margin-left: 16px;
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

const StBtnBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const StSignUpBtn = styled.button`
  margin-top: 40px;
  margin-bottom: 6px;
`;

const StLogin = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.paragraph};
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.05em;
  text-align: center;
  margin-left: 30px;

  a {
    height: 39px;
    margin-left: -16px;
  }
`;

export default SignUp;
