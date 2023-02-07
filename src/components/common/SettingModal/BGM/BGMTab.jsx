// 외부 모듈
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 내부 모듈
import confirm from 'assets/images/confirm.svg';
import { setVolume } from 'redux/soundSlice';

function BGMTab({ setting }) {
  const sound = useSelector((state) => state.bgmVolume);

  const [range, setRange] = useState(sound.volume);

  const dispatch = useDispatch();

  function onClickClose() {
    setting(false);
  }

  useEffect(() => {
    dispatch(setVolume(range));
  }, [dispatch, range]);

  return (
    <StBGMTab>
      <StTitle>
        <hr />
        사운드 조절 기능
        <hr />
      </StTitle>
      <StSubTitle>BGM 음량 조절</StSubTitle>
      <StVolumeCon>
        <StVolumeBox>
          <StVolume
            className="rangeInput"
            type="range"
            min={0}
            max={0.1}
            step={0.001}
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </StVolumeBox>
      </StVolumeCon>
      <StBtnBox />
      <StConfirm onClick={onClickClose}>
        <img src={confirm} alt="확인" />
      </StConfirm>
    </StBGMTab>
  );
}

const StBGMTab = styled.div`
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-size: 26px;
  line-height: 42px;
`;

const StTitle = styled.div`
  font-size: 30px;
`;

const StSubTitle = styled.div`
  margin-top: 26px;
`;

const StVolumeCon = styled.div`
  width: 100%;
  height: 40px;
  background: #643b11;
  border-radius: 30px;
  margin: 20px 0;
  padding-top: 5px;
`;

const StVolumeBox = styled.div`
  width: 100%;
  height: 30px;
  margin: 0 auto;
  border-radius: 20px;
  background: #fff4d0;
  padding-left: 10px;
`;

const StVolume = styled.input`
  -webkit-appearance: none;
  width: 98%;
  height: 26px;
  background: #643b11;
  border-radius: 20px;
  outline: none;

  &::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 3px solid #fff4d0;
    background-color: #643b11;
    -webkit-appearance: none;
    cursor: pointer;
  }
`;

const StBtnBox = styled.div`
  display: flex;

  span {
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.08em;
    font-size: 26px;
    line-height: 42px;
  }

  span:first-child {
    margin-right: 20px;
  }
`;

const StConfirm = styled.button`
  width: 200px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
`;

export default BGMTab;
