// 외부 모듈
import React, { useRef } from 'react';
import styled from 'styled-components';

function ImgUpload({ setImgs }) {
  const inputRef = useRef(null);

  const handleImage = (event) => {
    const imageLists = [];
    let fileNames = '';
    for (let i = 0; i < event.target.files.length; i += 1) {
      imageLists.push(event.target.files[i]);
      fileNames += `${event.target.files[i].name},`;
    }
    inputRef.current.value = fileNames;
    setImgs(imageLists);
  };

  return (
    <StImgUpload>
      <StSpan>첨부파일</StSpan>
      <span>|</span>
      <StFileName readOnly ref={inputRef} />
      <StLabel htmlFor="file">첨부하기</StLabel>
      <StinputImg
        id="file"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          handleImage(e);
        }}
      />
    </StImgUpload>
  );
}

const StImgUpload = styled.div`
  display: flex;
  align-items: center;
  width: 338px;
  height: 46px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.yellowBeige};
  margin-top: 12px;
  margin-left: auto;
  padding-left: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;

  span {
    margin-right: 2px;
  }
`;

const StSpan = styled.span`
  width: 71px;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.text3};
`;

const StFileName = styled.input`
  max-width: 160px;
  border: none;
  background: ${({ theme }) => theme.colors.yellowBeige};
  font-size: 14px;
  line-height: 17px;

  &:focus {
    outline: none;
  }
`;

const StLabel = styled.label`
  ${({ theme }) => theme.common.flexCenter}
  width: 78px;
  height: 27px;
  background: ${({ theme }) => theme.colors.lightBrown};
  border-radius: 4px;
  margin-left: auto;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.lightBeige};
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  letter-spacing: 0.1em;
`;

const StinputImg = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export default ImgUpload;
