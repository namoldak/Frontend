/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';
import { createBrowserHistory } from 'history';

// 내부 모듈
import useSound from 'hooks/useSound';
import bgm from 'assets/audio/bg.mp3';

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

  // function start() {
  //   const history = createBrowserHistory();
  //   if (history.location.pathname === '/rooms') {
  //     sound.play();
  //   } else {
  //     sound.stop();
  //   }
  // }

  return (
    <StModalContainer>
      <input
        id="volume"
        type="range"
        min={0}
        max={0.1}
        step={0.001}
        onChange={changeVolume}
      />
      <button
        onClick={() => {
          sound.pause();
        }}
      >
        pause
      </button>
      <button
        onClick={() => {
          sound.play();
        }}
      >
        play
      </button>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  position: absolute;
  top: 127px;
  left: 60px;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  outline: none;
  border-radius: 0px 15px 5px 5px;

  width: 450px;
  height: 250px;
`;

const StInputCon = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  input {
    width: 400px;
    height: 54px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 32px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;
export default BGMTab;
