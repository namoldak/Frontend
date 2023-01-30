/* eslint-disable jsx-a11y/label-has-associated-control */
// 외부 모듈
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// 내부 모듈
import backBtn from 'assets/images/backBtn.svg';
import okBtn from 'assets/images/okBtn.svg';
import { createPost } from 'redux/modules/postSlice';
// 이피지 파일
import landingBack from '../../../../assets/images/landingBack.svg';
import imageUploadBtn from '../../../../assets/images/imageUploadBtn.svg';
import postBtn from '../../../../assets/images/postBtn.svg';

function WritePost() {
  const dispatch = useDispatch();
  const [categoryCheck, setCategoryCheck] = useState('freeBoard');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [imgs, setImgs] = useState([]);
  const inputRef = useRef(null);

  function onChangeCheck(e) {
    setCategoryCheck(e.target.value);
  }

  const handleImage = (event) => {
    const imageLists = [];
    let fileNames = '';
    for (let i = 0; i < event.target.files.length; i += 1) {
      imageLists.push(event.target.files[i]);
      console.log(event.target.files[i].name);
      // eslint-disable-next-line no-const-assign
      fileNames += `${event.target.files[i].name},`;
    }
    console.log(fileNames);
    inputRef.current.value = fileNames;
    setImgs(imageLists);
  };

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
      <StWritePostHeader>
        <Link to="/posts/all">
          <StBackBtn>
            <img src={backBtn} alt="뒤로 가기" />
          </StBackBtn>
        </Link>
        <StTitle>게시글 작성</StTitle>
      </StWritePostHeader>
      <StContentBox>
        <StContentBoxInner>
          <StPostSection>
            <StTitleCategory>
              <StTitleArea
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
            <StContentArea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="내용을 입력해주세요."
            />
            <StinputImgOuter>
              <StSpan>첨부파일</StSpan>
              <StFileName readOnly ref={inputRef} />
              <StLabel htmlFor="file">
                <img src={imageUploadBtn} alt="이미지" />
              </StLabel>
              <StinputImg
                id="file"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
            </StinputImgOuter>
            <StWritePostBtn type="button" onClick={sendPost}>
              <img src={postBtn} alt="확인" />
            </StWritePostBtn>
          </StPostSection>
        </StContentBoxInner>
      </StContentBox>
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

const StPostSection = styled.div`
  width: 100%;
  height: 521px;
`;

const StTitleArea = styled.input`
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

const StContentBox = styled.div`
  margin-top: 38px;
  background-image: url(${landingBack});
  background-size: cover;
  background-repeat: no-repeat;
  width: 1180px;
  height: 713px;
  padding: 54px 88px 69px 88px;
`;

const StContentBoxInner = styled.div`
  width: 1004px;
  height: 590px;
  border-radius: 30px;
  background: rgba(4, 2, 0, 0.7);
  padding: 44px 35px 25px 35px;
`;

const StTitleCategory = styled.div`
  width: 100%;
  justify-content: center;
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

const StinputImgOuter = styled.div`
  width: 338px;
  height: 46px;
  border-radius: 4px;
  background-color: #f6d5a1;
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-left: auto;
  padding-left: 13px;
`;
const StinputImg = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const StFileName = styled.input`
  max-width: 160px;
  border: none;
  background-color: #f6d5a1;
  font-size: 14px;
`;

const StSpan = styled.span`
  width: 71px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.1em;
  color: #020202;
`;

const StLabel = styled.label`
  margin-left: auto;
  background-image: url(${imageUploadBtn});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 3px;
`;

export default WritePost;
