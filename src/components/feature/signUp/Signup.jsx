// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 내부 모듈
import { postSignup } from '../../../core/api/authAsync';

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 2자리입니다')
    .max(16, '닉네임은 최대 16자리입니다')
    .matches(
      /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
      '닉네임은 한글, 영문, 숫자만 가능합니다.',
    )
    .required('닉네임을 입력해주세요'),
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  async function onClickSignup(data) {
    await postSignup(data).then(
      alert('회원가입이 완료되었습니다. 다시 로그인 해 주세요.'),
      navigate('/login'),
    );
  }

  return (
    <StTopContainer>
      <StElementBox>
        <form onSubmit={handleSubmit(onClickSignup)}>
          <h1>NaMan-MoRunDark</h1>
          <h3>Sign Up</h3>
          <StInputCon>
            {/* 닉네임 유효성 검사 */}
            <InputBox>
              <Input
                placeholder="닉네임을 입력해주세요."
                {...register('nickname', { required: true })}
              />
              <Button>중복확인</Button>
            </InputBox>
            <HelpText>
              {errors.nicknameCheck?.message || errors.nickname?.message}
            </HelpText>
            {/* 이메일 유효성 검사 */}
            <InputBox>
              <Input
                placeholder="이메일을 입력해주세요"
                {...register('email', { required: true })}
              />
              <Button>중복확인</Button>
            </InputBox>
            <HelpText>
              {errors.emailCheck?.message || errors.email?.message}
            </HelpText>
            {/* 비밀번호 유효성 검사 */}
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', { required: true })}
            />
            <HelpText>{errors.password?.message}</HelpText>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              {...register('confirmPw', { required: true })}
            />
            <HelpText>{errors.confirmPw?.message}</HelpText>
          </StInputCon>
          <StBtnBox>
            <input type="submit" value="회원가입" />
            <Link to="/login">
              <button>로그인하러 가기</button>
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

const StInputCon = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgb(157, 145, 145);
  padding: 30px;

  gap: 20px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
  max-width: 80px;
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

export default Signup;
