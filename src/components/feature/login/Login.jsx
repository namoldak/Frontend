// 외부 모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setCookie } from '../../../utils/cookies';

// 내부 모듈
import authAPI from '../../../api/authAsync';
import KaKaoBtn from './KaKaoBtn';

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일을 입력해주세요.').required(''),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function Login() {
  // 로그인 후 랜딩페이지로
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
      alert('로그인 되었습니다.');
      navigate('/');
    });
  }

  // 카카오 로그인 api
  const KakaoLogin = async (code) => {
    await authAPI.KakaoLogin(code).then((response) => {
      console.log(response);
      setCookie(response.headers.authorization);
      alert(`${response.data.msg}`, '카카오 로그인 성공');
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
    <StTopContainer>
      <StElementBox>
        <form onSubmit={handleSubmit(onClickLogin)}>
          <h1>NaMan-MoRunDark</h1>
          <h3>Login</h3>
          <StInputBox>
            <Input
              placeholder="이메일을 입력해주세요"
              {...register('email', { required: true })}
            />
            <HelpText>{errors.email?.message}</HelpText>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', { required: true })}
            />
            <HelpText>{errors.password?.message}</HelpText>
          </StInputBox>
          <StBtnBox>
            <input type="submit" value="로그인" disabled={!isValid} />
            <KaKaoBtn />
            <Link to="/signup">
              <Button>회원가입 하기</Button>
            </Link>
          </StBtnBox>
        </form>
      </StElementBox>
    </StTopContainer>
  );
}

const StTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 100px auto;
  padding: 30px;

  border: 1px solid gray;
  max-width: 500px;
`;

const StElementBox = styled.div`
  border: 1px solid rgb(195, 195, 195);
  padding: 30px;
`;

const StInputBox = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgb(157, 145, 145);
  padding: 30px;

  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 20px;
`;

const Button = styled.button`
  width: 100%;
  cursor: default;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
`;

const HelpText = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  color: #fe415c;
`;

const StBtnBox = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgb(111, 92, 92);
  padding: 30px;

  gap: 20px;
`;

export default Login;
