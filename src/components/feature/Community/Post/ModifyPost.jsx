/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import okBtn from 'assets/images/okBtn.svg';
import { updatePost } from 'redux/modules/postSlice';

function ModifyPost() {
  const param = useParams();
  const dispatch = useDispatch();
  const [categoryCheck, setCategoryCheck] = useState('freeBoard');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  function onChangeCheck(e) {
    setCategoryCheck(e.target.value);
  }

  function sendPost() {
    const post = {
      content,
      title,
    };
    dispatch(updatePost({ post, img, postId: param.id }));
  }

  return (
    <StWritePost>
      <StWritePostHeader>
        <Link to="/posts/all">
          <StBackBtn>
            <img src={backBtn} alt="뒤로 가기" />
          </StBackBtn>
        </Link>
        <StTitle>게시글 수정</StTitle>
      </StWritePostHeader>
      <StInputBox>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
      </StInputBox>
      <StPostSection>
        <StTitleArea
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요."
        />
        <StContentArea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="내용을 입력해주세요."
        />
      </StPostSection>
      <StWritePostBtn type="button" onClick={sendPost}>
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

export default ModifyPost;
