// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// 내부 모듈
import { readOnePost } from 'redux/postSlice';
import useDebounce from 'hooks/useDebounce';
import { instance } from 'api/core/axios';
import { useToast } from 'react-toastify';

// 이피지 파일
import postBtn from 'assets/images/postBtn.svg';
import ImgUpload from 'components/common/ImgUpload/ImgUpload';

function ModifyPost() {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts.posts);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [imgs, setImgs] = useState([]);

  const modifyPost = useDebounce(async () => {
    const post = {
      content,
      title,
    };
    const formData = new FormData();
    const json = JSON.stringify(post);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('data', blob);
    for (let i = 0; i < imgs.length; i += 1) {
      formData.append('file', imgs[i]);
    }
    await instance
      .put(`/posts/${param.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        navigate(`/posts/${res.data.id}`);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          useToast(`${error.response.data.message}`, 'error');
        } else {
          useToast('에러가 발생했닭! 다시 시도해야한닭!', 'error');
        }
      });
  }, 200);

  useEffect(() => {
    dispatch(readOnePost(param.id));
  }, []);

  return (
    <>
      <StTitleCategory>
        <StModifyTitle
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </StTitleCategory>
      <StModifyContent
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <ImgUpload setImgs={setImgs} />
      <StWritePostBtn type="button" onClick={modifyPost}>
        <img src={postBtn} alt="확인" />
      </StWritePostBtn>
    </>
  );
}

const StModifyTitle = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.lightBeige};
  border-radius: 10px;
  padding-left: 17px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};

  &:focus {
    outline: none;
  }
`;

const StModifyContent = styled.textarea`
  width: 100%;
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

  &:focus {
    outline: none;
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
