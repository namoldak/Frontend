// 외부 모듈
import React, { useRef } from 'react';
import styled from 'styled-components';

// 내부 모듈
import imageUploadBtn from 'assets/images/imageUploadBtn.svg';

function ImgUpload({ setImgs }) {
  //   const [imgs, setImgs] = useState([]);
  const inputRef = useRef(null);

  const handleImage = (event) => {
    const imageLists = [];
    let fileNames = '';
    for (let i = 0; i < event.target.files.length; i += 1) {
      imageLists.push(event.target.files[i]);
      // eslint-disable-next-line no-const-assign
      fileNames += `${event.target.files[i].name},`;
    }
    inputRef.current.value = fileNames;
    setImgs(imageLists);
  };

  return (
    <StImgUpload>
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
    </StImgUpload>
  );
}

const StImgUpload = styled.div`
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

const StSpan = styled.span`
  width: 71px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.1em;
  color: #020202;
`;

const StFileName = styled.input`
  max-width: 160px;
  border: none;
  background-color: #f6d5a1;
  font-size: 14px;
`;

const StLabel = styled.label`
  margin-left: auto;
  background-image: url(${imageUploadBtn});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 3px;
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
