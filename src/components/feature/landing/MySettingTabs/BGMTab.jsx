/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';
import { createBrowserHistory } from 'history';

// 내부 모듈
import useSound from 'hooks/useSound';
import bgm from 'assets/audio/bg.mp3';
import confirm from 'assets/images/confirm.svg';

function BGMTab() {
  const sound = new Howl({
    src: [bgm],
    loop: true,
    volume: 0.1,
    onseek() {
      console.log('Finished!');
    },
  });

  function changeVolume() {
    const currentVolume = document.activeElement.value;
    sound.volume(currentVolume);
  }

  function onClickClose() {
    // setIsSettingModalOn(false);
  }

  // function start() {
  //   const history = createBrowserHistory();
  //   if (history.location.pathname === '/rooms') {
  //     sound.play();
  //   } else {
  //     sound.stop();
  //   }
  // }

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
            onChange={changeVolume}
          />
        </StVolumeBox>
      </StVolumeCon>
      <StBtnBox>
        <button
          onClick={() => {
            sound.pause();
          }}
        >
          <span>중지</span>
        </button>
        <button
          onClick={() => {
            sound.play();
          }}
        >
          <span>재생</span>
        </button>
      </StBtnBox>
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
  padding-left: 6px;
`;

const StVolume = styled.input`
  -webkit-appearance: none;
  width: 99%;
  height: 26px;
  margin: 0 auto;
  background: #643b11;
  border-radius: 20px;
  outline: none;

  &::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid #fff4d0;
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
