// 외부 모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 내부 모듈
import useToast from 'hooks/useToast';
import {
  setRefreshToken,
  setAccessToken,
  setKakaoToken,
  setNicknameCookie,
} from 'utils/cookies';
import authAPI from 'api/authAsync';
import popUp from 'assets/images/popUp.svg';
import loginTitleBtn from 'assets/images/loginTitleBtn.svg';
import loginBtn from 'assets/images/loginBtn.svg';
import miniSignUpBtn from 'assets/images/miniSignUpBtn.svg';
import check from 'assets/images/check.svg';
import BackButton from 'components/common/Button/BackButton';
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
      setRefreshToken(response.headers.refreshtoken);
      setAccessToken(response.headers.accesstoken);
      setNicknameCookie(response.data.nickname);
      useToast('로그인 되었습니다.', 'success');
      navigate('/');
    });
  }

  // 카카오 로그인 api
  const KakaoLogin = async (code) => {
    await authAPI.KakaoLogin(code).then((response) => {
      setAccessToken(response.headers.accesstoken);
      setKakaoToken(response.headers.kakaotoken);
      setNicknameCookie(response.data);
      useToast('카카오 로그인 되었습니다.', 'success');
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
    <StLogin>
      <BackButton url="/" />
      <StLoginWrapper>
        <StLoginContainer onSubmit={handleSubmit(onClickLogin)}>
          <StTitle>
            <img src={loginTitleBtn} alt="로그인" />
          </StTitle>
          <StInputBox className="emailBox">
            <input
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <StHelpText>
                <img src={check} alt="체크" />
                {errors.email?.message}
              </StHelpText>
            )}
          </StInputBox>
          <StInputBox>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', { required: true })}
            />
            {errors.password && (
              <StHelpText>
                <img src={check} alt="체크" />
                {errors.password?.message}
              </StHelpText>
            )}
          </StInputBox>
          <StBtnBox>
            <StLoginBtn type="submit">
              <img src={loginBtn} alt="로그인 버튼" />
            </StLoginBtn>
            <KaKaoBtn />
            <StSignUp>
              <p>회원이 아니신가요?</p>
              <button
                onClick={() => {
                  navigate('/signup');
                }}
              >
                <img src={miniSignUpBtn} alt="회원가입" />
              </button>
            </StSignUp>
          </StBtnBox>
        </StLoginContainer>
      </StLoginWrapper>
    </StLogin>
  );
}

const StLogin = styled.div`
  padding-top: 72px;

  @media ${(props) => props.theme.laptop} {
    padding-top: 30px;
  }
`;

const StLoginWrapper = styled.div`
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

const StLoginContainer = styled.form`
  padding-top: 85px;

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

const StInputBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  position: relative;

  &.emailBox {
    margin-top: 40px;
    margin-bottom: 53px;
  }
`;

const StHelpText = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 225px;
  bottom: -32px;
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

const StLoginBtn = styled.button`
  width: 160px;
  height: 60px;
  margin-top: 74px;
  margin-bottom: 16px;
`;

const StSignUp = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.paragraph};
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 34px;
  margin-left: 30px;

  button {
    height: 39px;
    margin-left: -12px;
  }
`;

export default Login;
