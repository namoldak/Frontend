/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import okBtn from 'assets/images/okBtn.svg';
import { updatePost, readOnePost } from 'redux/modules/postSlice';

function ModifyPost() {
  const post = useSelector((state) => state.posts.posts);
  const param = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [imgs, setImgs] = useState([]);
  const navigate = useNavigate();

  const handleImage = (event) => {
    const imageLists = [];
    for (let i = 0; i < event.target.files.length; i += 1) {
      imageLists.push(event.target.files[i]);
    }
    console.log(imageLists);
    setImgs(imageLists);
  };

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
          multiple
          accept="image/*"
          onChange={(e) => {
            handleImage(e);
          }}
        />
      </StInputBox>
      <StPostSection>
        <StTitleArea
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <StContentArea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </StPostSection>
      <StWritePostBtn type="button" onClick={modifyPost}>
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
