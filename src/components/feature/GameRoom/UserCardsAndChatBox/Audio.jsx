import React, { useEffect, useRef, useState } from 'react';

function Audio({ stream, nickName, keyword }) {
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [userkeyword, setUserKeyword] = useState('키워드');
  const [userList, setUserList] = useState('');

  // console.log('nick', nickName);
  // console.log('key', keyword);
  // console.log('userkey', userkeyword);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }

    setUserKeyword(keyword[`${nickName}`]);
  }, [stream, keyword]);

  return (
    <>
      Card
      <h4>{userkeyword}</h4>
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
