import { Howl } from 'howler';

function useEffectSound(src, volume = 1) {
  let sound;
  const soundEffect = (src) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundEffect(src);
  return sound;
}

export default useEffectSound;
