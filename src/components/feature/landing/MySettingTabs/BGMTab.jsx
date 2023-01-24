/* eslint-disable react-hooks/rules-of-hooks */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';

// 내부 모듈
import useSound from 'hooks/useSound';

function BGMTab() {
  const sound = new Howl({
    src: ['bg.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend() {
      console.log('Finished!');
    },
  });

  sound.play();

  function changeVolume() {
    const currentVolume = document.activeElement.value;
    console.log('currentVolume', currentVolume);
    sound.volume(currentVolume);
  }

  return (
    <StModalContainer>
      <input
        id="volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={changeVolume}
      />
      <button>pause</button>
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
