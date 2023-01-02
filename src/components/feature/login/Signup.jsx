// 외부 모듈
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 내부 모듈

function Signup() {
  return (
    <StTopContainer>
      <StElementBox>
        <div>
          <h1>NaMan-MoRunDark</h1>
          <h3>Sign Up</h3>
        </div>
        <StInputBox>
          <div>
            <input placeholder="Nickname 입력"></input>
          </div>
          <div>
            <input placeholder="Email 입력"></input>
          </div>
          <div>
            <input placeholder="비밀번호 입력"></input>
          </div>
        </StInputBox>
        <StBtnBox>
          <div>
            <button>Sign up</button>
          </div>
          <Link to={"/login"}>
            <button>로그인하러 가기</button>
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