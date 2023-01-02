// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

// 내부 모듈
import { postSignup } from '../../../core/api/authAsync';

function Signup() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['id']);

  async function onClickSignup(data) {
    await postSignup(data).then(
      alert('회원가입이 완료되었습니다. 다시 로그인 해 주세요".'),
      navigate('/login'),
    );
  }

  return (
    <StTopContainer>
      <StElementBox>
        <div>
          <h1>NaMan-MoRunDark</h1>
          <h3>Sign Up</h3>
        </div>
        <StInputBox>
          <div>
            <input placeholder="Nickname 입력" />
          </div>
          <div>
            <input placeholder="Email 입력" />
          </div>
          <div>
            <input placeholder="비밀번호 입력" />
          </div>
        </StInputBox>
        <StBtnBox>
          <div>
            <button>Sign up</button>
          </div>
          <Link to="/login">
            <button onClick={onClickSignup(data)}>로그인하러 가기</button>
          </Link>
        </StBtnBox>
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

const StBtnBox = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgb(111, 92, 92);
  padding: 30px;

  gap: 20px;
`;

export default Signup;
