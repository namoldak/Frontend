import { Howl } from 'howler';

function useSound(src, volume = 1) {
  let sound;
  const soundEffect = (src) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundEffect(src);
  return sound;
}

export default useSound;
