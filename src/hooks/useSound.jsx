import React, { useEffect } from 'react';
import { Howl } from 'howler';
import { createBrowserHistory } from 'history';

function useSound(src, volume = 0.01) {
  let sound;
  const soundStop = () => sound.stop();
  const soundPlay = (src) => {
    sound = new Howl({ src, autoplay: true, loop: true });
    sound.volume(volume);
    sound.play();
  };

  useEffect(() => {
    soundPlay(src);
    sound.on('play', () => {
      const history = createBrowserHistory();
      if (history.location.pathname !== '/rooms') {
        sound.stop();
      }
    });
    return soundStop;
  }, []);
}

export default useSound;
