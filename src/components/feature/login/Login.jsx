// 외부 모듈
import React, { useEffect, forwardRef, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setCookie, setNicknameCookie } from '../../../utils/cookies';

// 내부 모듈
import authAPI from '../../../api/authAsync';
import KaKaoBtn from './KaKaoBtn';
import popUp from '../../../assets/images/popUp.svg';
import loginTitleBtn from '../../../assets/images/loginTitleBtn.svg';
import loginBtn from '../../../assets/images/loginBtn.svg';
import backBtn from '../../../assets/images/backBtn.svg';

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
    // console.log('로그인 data', data);
    await authAPI.Login(data).then((response) => {
      // console.log('로그인 response', response);
      setCookie(response.headers.authorization);
      setNicknameCookie(response.data.nickname);
      alert('로그인 되었습니다.');
      navigate('/');
    });
  }

  // 카카오 로그인 api
  const KakaoLogin = async (code) => {
    await authAPI.KakaoLogin(code).then((response) => {
      setCookie(response.headers.authorization);
      // console.log('클라이언트 카카오 data', response.data);
      setNicknameCookie(response.data);
      alert('카카오 로그인 성공');
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
                <button>회원가입</button>
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
  width: 942px;
  height: 700px;
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
  height: 88px;
`;

const StInputBox = styled.div`
  input {
    width: 484px;
    height: 64px;
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
  margin-top: 32px;
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

const StBackBtn = styled.button`
  margin-top: 30px;
  margin-left: 10px;
  width: 78px;
  height: 78px;
`;

export default Login;
