/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useEffect, forwardRef, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 내부 모듈
import useToast from 'hooks/useToast';
import { setRefreshToken, setCookie, setNicknameCookie } from 'utils/cookies';
import authAPI from 'api/authAsync';
import popUp from 'assets/images/popUp.svg';
import loginTitleBtn from 'assets/images/loginTitleBtn.svg';
import loginBtn from 'assets/images/loginBtn.svg';
import backBtn from 'assets/images/backBtn.svg';
import miniSignUpBtn from 'assets/images/miniSignUpBtn.svg';
import KaKaoBtn from './KaKaoBtn';

// useForm
const schema = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일을 입력해주세요.')
    .required('올바른 이메일을 입력해주세요.'),
  password: yup.string().required('올바른 비밀번호를 입력해주세요'),
});

function Login() {
  const navigate = useNavigate();
  // 카카오 로그인 인증 code
  const [searchParams] = useSearchParams(); // URL 내의 GET 디코딩 된 쿼리 매개변수에 접근
  const code = searchParams.get('code'); // 인가 코드 Redirect_URI 뒤 파라미터 ?code={코드 내용}

  // 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  // 로그인 api
  async function onClickLogin(data) {
    await authAPI.Login(data).then((response) => {
      setRefreshToken(response.headers.authorization);
      setCookie(response.headers.authorization);
      setNicknameCookie(response.data.nickname);
      useToast('로그인 되었습니다.', 'success');
      navigate('/');
    });
  }

  // 카카오 로그인 api
  const KakaoLogin = async (code) => {
    await authAPI.KakaoLogin(code).then((response) => {
      setRefreshToken(response.headers.authorization);
      setCookie(response.headers.authorization);
      setNicknameCookie(response.data);
      useToast('카카오 로그인 성공', 'success');
      navigate('/');
    });
  };

  // 위에서 선언한 변수 code
  useEffect(() => {
    if (code) {
      KakaoLogin(code);
    }
  }, [code]);

  return (
    <>
      {/* {errors.email?.message && useToast(`${errors.email?.message}`, 'error')}
      {errors.password?.message &&
        useToast(`${errors.password?.message}`, 'error')} */}
      <StBackBtn>
        <Link to="/">
          <img src={backBtn} alt="뒤로가기" />
        </Link>
      </StBackBtn>
      <StLogin>
        <StLoginContainer onSubmit={handleSubmit(onClickLogin)}>
          <StTitle>
            <img src={loginTitleBtn} alt="로그인" />
          </StTitle>
          <StInputBox>
            <input
              type="text"
              className="emailInput"
              placeholder="이메일을 입력해주세요"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: true })}
            />
            {/* <StHelpText>{errors.email?.message}</StHelpText> */}
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', { required: true })}
            />
            {/* <StHelpText>{errors.password?.message}</StHelpText> */}
          </StInputBox>
          <StBtnBox>
            <StLoginBtn type="submit">
              <img src={loginBtn} alt="로그인 버튼" />
            </StLoginBtn>
            <KaKaoBtn />
            <StSignUp>
              <p>회원이 아니신가요?</p>
              <Link to="/signup">
                <button>
                  <img src={miniSignUpBtn} alt="회원가입" />
                </button>
              </Link>
            </StSignUp>
          </StBtnBox>
        </StLoginContainer>
      </StLogin>
    </>
  );
}

const StLogin = styled.div`
  ${({ theme }) => theme.common.absoluteCenter}
  width: 994px;
  height: 731px;
  background-image: url(${popUp});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StLoginContainer = styled.form`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 100%;
  text-align: center;
`;

const StTitle = styled.div`
  width: 284px;
  height: 78px;
  margin-bottom: 20px;
`;

const StInputBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  gap: 20px;
  input {
    width: 484px;
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
  .emailInput {
    margin-top: 50px;
    margin-bottom: 32px;
  }
`;

const StBtnBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 20px;
`;

const StLoginBtn = styled.button`
  width: 170px;
  height: 60px;
  margin-top: 38px;
  margin-bottom: 34px;
`;

const StSignUp = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
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

export default Login;
