import React, { useEffect, useRef, useState } from 'react';

function Audio({ stream }) {
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log(stream.getVideoTracks()[0]);
    if (ref.current) ref.current.srcObject = stream;
    console.log(stream.getVideoTracks()[0].enabled);
    if (stream.getVideoTracks()[0].enabled) {
      console.log(stream.getVideoTracks()[0].enabled);
      console.log('true임');
      ref.current.style.display = 'blokc';
    } else {
      console.log(stream.getVideoTracks()[0].enabled);
      console.log('false임');
      ref.current.style.display = 'none';
    }
  }, [stream, stream.getVideoTracks()[0].enabled]);

  return (
    <>
      Card
      <h4>키워드</h4>
      <span>OOO님</span>
      <div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={ref}
          id="myFace"
          autoPlay
          playsInline
          width={200}
          height={200}
        >
          비디오
        </video>
      </div>
    </>
  );
}

export default Audio;
