/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// 내부 모듈
import { updatePost, readOnePost } from 'redux/modules/postSlice';

// 이피지 파일
import postBtn from 'assets/images/postBtn.svg';
import ImgUpload from 'components/common/ImgUpload';

function ModifyPost() {
  const dispatch = useDispatch();
  const param = useParams();
  const post = useSelector((state) => state.posts.posts);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [imgs, setImgs] = useState([]);

  function modifyPost() {
    const post = {
      content,
      title,
    };
    dispatch(updatePost({ post, imgs, postId: param.id }));
  }

  useEffect(() => {
    dispatch(readOnePost(param.id));
  }, []);

  return (
    <StModifyPost>
      <StTitleCategory>
        <StTitleArea
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </StTitleCategory>
      <StContentArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <ImgUpload setImgs={setImgs} />
      <StWritePostBtn type="button" onClick={modifyPost}>
        <img src={postBtn} alt="확인" />
      </StWritePostBtn>
    </StModifyPost>
  );
}

const StModifyPost = styled.div`
  width: 100%;
  height: 521px;
`;

const StTitleArea = styled.input`
  display: inline-block;
  width: 934px;
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
const StContentArea = styled.textarea`
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

const StTitleCategory = styled.div`
  width: 100%;
  justify-content: left;
  display: flex;
  height: 54px;
  margin-bottom: 12px;
`;
const StWritePostBtn = styled.button`
  margin-top: 12px;
  display: block;
  width: 136px;
  height: 45px;
  margin-left: auto;
`;

export default ModifyPost;
