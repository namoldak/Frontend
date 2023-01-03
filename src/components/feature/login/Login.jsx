// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Cookies, useCookies } from 'react-cookie';

// 내부 모듈
import { postLogin } from '../../../core/api/authAsync';

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일을 입력해주세요.').required(''),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['id']);

  async function onClickLogin(data) {
    await postLogin(data).then(
      (response) => alert('로그인 되었습니다.'),
      // setCookies('id', response.data.token),
    );
  }

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
            <input type="submit" value="로그인" />
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
