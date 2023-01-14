import React, { useEffect, useRef, useState } from 'react';

function Audio({ stream, nickName }) {
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      Card
      <h4>키워드</h4>
      <span>{nickName}님</span>
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
