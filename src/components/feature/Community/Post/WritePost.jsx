/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

// 내부 모듈
import useToast from 'hooks/useToast';
import postBtn from 'assets/images/postBtn.svg';
import ImgUpload from 'components/common/ImgUpload';
import select from 'assets/images/select.svg';
import { instance } from 'api/core/axios';
import useDebounce from 'hooks/useDebounce';

function WritePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [categoryCheck, setCategoryCheck] = useState('freeBoard');
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState([]);
  const navigate = useNavigate();

  const feedbackFormat = `[나만 모른닭 🐓] 서비스의 솔직한 만족도를 알려주세요 😁

정성스럽게 작성해 주실수록 당첨 확률이 올라갑니다! 

*** 작성하신 피드백 게시글은 본인만 확인할 수 있습니다. ***



1. 참여하신 분의 성별을 알려주세요. 



2. 참여하신 분의 연령대를 알려주세요.



3. 어떤 경로로 [나만 모른닭]을 알게 되셨나요?
 


4. [나만 모른닭] 서비스에서 만족하신 부분을 말씀 부탁드립니다. 



5. [나만 모른닭] 서비스에서 어떤 점들이 불편하셨나요? 
   


6. 서비스를 다시 이용하실 의향이 있으신가요? 
    


7. 당첨이 되셨을 경우 연락 가능한 연락처를 남겨주세요! (전화번호, 카카오톡, 슬랙, 이메일)



`;

  const sendPost = useDebounce(async () => {
    if (title === '') {
      useToast('제목이 없닭!', 'warning');
      return;
    }

    if (content === '') {
      useToast('내용이 없닭!', 'warning');
      return;
    }

    const post = {
      category: categoryCheck,
      content,
      title,
    };
    try {
      const formData = new FormData();
      const json = JSON.stringify(post);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('data', blob);
      for (let i = 0; i < imgs.length; i += 1) {
        formData.append('file', imgs[i]);
      }

      instance
        .post(`/posts/write`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          navigate(`/posts/${res.data.id}`);
        });
    } catch (error) {
      console.log('error', error);
      useToast(`${error.response.data.message}`, 'error');
    }
  }, 200);

  function onChangeCheck(e) {
    setCategoryCheck(e.target.value);
  }

  return (
    <>
      <StTitleCategory>
        <StWriteTitle
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요."
        />
        <StCategorySelect onChange={onChangeCheck}>
          <StOption value="freeBoard">자유게시판</StOption>
          <StOption value="feedbackBoard">피드백 남기기</StOption>
        </StCategorySelect>
      </StTitleCategory>
      {categoryCheck === 'feedbackBoard' ? (
        <StWriteContent
          onChange={(e) => {
            setContent(e.target.value);
          }}
          defaultValue={feedbackFormat}
        />
      ) : (
        <StWriteContent
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="내용을 입력해주세요."
          defaultValue=""
        />
      )}
      <ImgUpload setImgs={setImgs} />
      <StWritePostBtn type="button" onClick={sendPost}>
        <img src={postBtn} alt="확인" />
      </StWritePostBtn>
    </>
  );
}

const StTitleCategory = styled.form`
  display: flex;
  height: 54px;
  margin-bottom: 12px;
`;

const StWriteTitle = styled.input`
  width: 717px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 10px;
  padding-left: 17px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  ::placeholder {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.text3};
  }

  &:focus {
    outline: none;
  }
  white-space: pre-wrap;
`;

const StCategorySelect = styled.select`
  width: 205px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 6px solid ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;
  margin-left: 12px;
  appearance: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.text3};
  text-align: left;
  padding-left: 30px;
  cursor: pointer;

  background-image: url(${select}); // arrow
  background-repeat: no-repeat;
  background-position: 90% center;

  &:focus {
    outline: none;
  }
`;

const StOption = styled.option`
  border: 2px solid black;
`;

const StWriteContent = styled.textarea`
  width: 934px;
  height: 340px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.lightBeige};
  padding: 15px 0 0 17px;
  font-family: 'CoreDream';
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  ::placeholder {
    font-family: 'CoreDream';
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.text3};
  }

  &:focus {
    outline: none;
  }
`;

const StWritePostBtn = styled.button`
  margin-top: 12px;
  display: block;
  width: 136px;
  height: 45px;
  margin-left: auto;
`;

export default WritePost;
