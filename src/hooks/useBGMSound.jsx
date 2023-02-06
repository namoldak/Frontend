import React, { useEffect } from 'react';
import { Howl } from 'howler';
import { createBrowserHistory } from 'history';

function useBGMSound(src, volume = 0.1) {
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
      history.listen(({ action }) => {
        if (action === 'POP') {
          sound.stop();
        }
      });
    });
    return soundStop;
  }, []);
}

export default useBGMSound;
