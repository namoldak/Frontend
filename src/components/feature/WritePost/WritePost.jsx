/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import okBtn from 'assets/images/okBtn.svg';

function WritePost() {
  const [categoryCheck, setCategoryCheck] = useState('');

  function onChangeCheck(e) {
    setCategoryCheck(e.target.value);
  }

  return (
    <StWritePost>
      <StWritePostHeader>
        <Link to="/posts/all">
          <StBackBtn>
            <img src={backBtn} alt="뒤로 가기" />
          </StBackBtn>
        </Link>
        <StTitle>게시글 작성</StTitle>
      </StWritePostHeader>
      <StInputBox>
        <StRadioBox>
          <label className="free">
            <input
              type="radio"
              value="1"
              checked={categoryCheck === '1'}
              onChange={onChangeCheck}
            />
            자유 게시판
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={categoryCheck === '2'}
              onChange={onChangeCheck}
            />
            유저 피드백
          </label>
        </StRadioBox>
        <input type="file" accept="image/*" />
      </StInputBox>
      <StPostSection>
        <StTitleArea placeholder="제목을 입력해주세요." />
        <StContentArea placeholder="내용을 입력해주세요." />
      </StPostSection>
      <StWritePostBtn>
        <img src={okBtn} alt="확인" />
      </StWritePostBtn>
    </StWritePost>
  );
}

const StWritePost = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const StWritePostHeader = styled.div`
  display: flex;
`;

const StBackBtn = styled.button`
  width: 78px;
  height: 78px;
`;

const StTitle = styled.p`
  font-family: MapoBackpacking;
  font-size: 30px;
  line-height: 22px;
  margin-right: auto;
  margin-left: 20px;
  padding-top: 30px;
  color: ${({ theme }) => theme.colors.lightBeige};
`;

const StInputBox = styled.div`
  ${({ theme }) => theme.common.flexBetween}
  margin-top: 40px;
`;

const StRadioBox = styled.div`
  display: flex;
  font-size: 22px;
  color: #fff;

  .free {
    margin-right: 30px;
  }

  input {
    width: 1.25em; /* 너비 설정 */
    height: 1.25em; /* 높이 설정 */
  }
`;

const StPostSection = styled.div`
  margin-top: 30px;
`;

const StTitleArea = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  padding: 14px 20px 10px 20px;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 10px;

  ::placeholder {
    font-size: 20px;
    line-height: 20px;
  }
`;
const StContentArea = styled.textarea`
  width: 100%;
  height: 45vh;
  resize: none;
  padding: 14px 20px 10px 20px;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 10px;

  ::placeholder {
    font-size: 20px;
    line-height: 20px;
  }
`;

const StWritePostBtn = styled.button`
  display: flex;
  width: 200px;
  height: 80px;
  margin-top: 30px;
  margin-left: auto;
`;

export default WritePost;
