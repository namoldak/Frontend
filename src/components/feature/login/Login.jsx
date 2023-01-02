// 외부 모듈
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

// 내부 모듈
import { postLogin } from '../../../core/api/authAsync';

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['id']);

  async function onClickLogin(data) {
    await postLogin(data).then(
      (response) => alert('로그인 되었습니다.'),
      setCookies('id', response.data.token),
    );
  }

  return (
    <StTopContainer>
      <StElementBox>
        <div>
          <h1>NaMan-MoRunDark</h1>
          <h3>Login</h3>
        </div>
        <StInputBox>
          <div>
            <input placeholder="Email 입력" />
          </div>
          <div>
            <input placeholder="비밀번호 입력" />
          </div>
        </StInputBox>
        <StBtnBox>
          <div>
            <button>Login</button>
          </div>
          <Link to="/signup">
            <button onClick={onClickLogin(data)}>회원가입 하기</button>
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
export default Login;
