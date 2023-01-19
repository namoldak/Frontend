import React, { useEffect } from 'react';
import { Howl } from 'howler';

function useSound(src, volume = 0.2) {
  let sound;
  const soundPlay = (src) => {
    sound = new Howl({ src, autoplay: true, loop: true });
    sound.volume(volume);
    sound.play();
  };

  useEffect(() => {
    soundPlay(src);
  }, []);
}

export default useSound;
