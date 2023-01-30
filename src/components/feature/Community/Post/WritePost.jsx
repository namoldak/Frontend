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
    <StWritePost>
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
    </StWritePost>
  );
}

const StWritePost = styled.div`
  width: 100%;
  height: 521px;
`;

const StTitleCategory = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  height: 54px;
  margin-bottom: 12px;
`;

const StWriteTitle = styled.input`
  display: inline-block;
  width: 717px;
  height: 100%;
  resize: none;
  font-size: 20px;
  line-height: 54px;
  border-radius: 10px;
  background-color: #f5ecd9;
  ::placeholder {
    font-size: 20px;
    line-height: 54px;
  }
`;

const StCategorySelect = styled.select`
  display: inline-block;
  width: 205px;
  height: 100%;
  background-color: #f5ecd9;
  border: 6px solid #f0a430;
  border-radius: 10px;
  margin-left: 12px;
  text-align: center;
  font-size: 20px;
`;

const StOption = styled.option`
  border: 2px solid black;
`;

const StWriteContent = styled.textarea`
  width: 934px;
  height: 340px;
  border-radius: 4px;
  background-color: #f5ecd9;
  resize: none;
  font-size: 20px;
  line-height: 20px;
  ::placeholder {
    font-size: 20px;
    line-height: 20px;
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
