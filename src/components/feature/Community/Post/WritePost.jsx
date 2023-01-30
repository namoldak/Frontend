/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// 내부 모듈
import { createPost } from 'redux/modules/postSlice';
import postBtn from 'assets/images/postBtn.svg';
import ImgUpload from 'components/common/ImgUpload';

function WritePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [categoryCheck, setCategoryCheck] = useState('freeBoard');
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState([]);

  function onChangeCheck(e) {
    setCategoryCheck(e.target.value);
  }

  function sendPost() {
    const post = {
      category: categoryCheck,
      content,
      title,
    };
    dispatch(createPost({ post, imgs }));
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
          <StOption value="feedbackBoard">유저 피드백</StOption>
        </StCategorySelect>
      </StTitleCategory>
      <StWriteContent
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용을 입력해주세요."
      />
      <ImgUpload setImgs={setImgs} />
      <StWritePostBtn type="button" onClick={sendPost}>
        <img src={postBtn} alt="확인" />
      </StWritePostBtn>
    </>
  );
}

const StTitleCategory = styled.div`
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
  text-align: center;

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
