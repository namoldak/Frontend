// 외부 모듈
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { readOnePost } from 'redux/postSlice';
import styled from 'styled-components';

// 내부 모듈
import { formatTime } from 'utils/date';
import postPhoto from 'assets/images/postPhoto.svg';

function Post({ postInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPhoto, setIsPhoto] = useState(false);
  const { imageList } = postInfo;

  function clickPost() {
    dispatch(readOnePost(postInfo.id));
    navigate(`/posts/${postInfo.id}`);
  }

  useEffect(() => {
    if (imageList !== null) {
      setIsPhoto(true);
    }
  }, [imageList]);

  return (
    <StPost>
      <StPostBox key={postInfo.id} onClick={clickPost}>
        <PostTitleBox>
          <PostTitle>{postInfo.title}</PostTitle>
          {isPhoto && (
            <PhotoImg>
              <img src={postPhoto} alt="사진" />
            </PhotoImg>
          )}
        </PostTitleBox>
        <CmtCnt>{postInfo.cmtCnt}</CmtCnt>
        <CreatedAt>{formatTime(postInfo?.createdAt)}</CreatedAt>
        <div>{postInfo.nickname}</div>
      </StPostBox>
    </StPost>
  );
}

const StPost = styled.div`
  display: flex;
  height: 54px;
`;

const StPostBox = styled.div`
  display: grid;
  grid-template-columns: 604px 110px 110px 110px;
  place-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text3};
`;

const PostTitleBox = styled.div`
  display: flex;
  width: 600px;
  max-width: 600px;
`;

const PostTitle = styled.div`
  font-size: 16px;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  padding-left: 10px;
`;

const PhotoImg = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 10px;
`;

const CmtCnt = styled.div`
  letter-spacing: 0.08em;
`;

const CreatedAt = styled.div``;

export default Post;
