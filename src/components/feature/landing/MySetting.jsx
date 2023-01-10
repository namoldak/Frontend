// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from '../../common/Modals/Modal';
import MyPageModal from '../../common/Modals/MyPageModal';

function MySetting() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <div>
      {isModalOn && (
        <Modal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<MyPageModal />}
        />
      )}
      <button
        onClick={() => {
          setIsModalOn(true);
        }}
      >
        탈퇴
      </button>
    </div>
  );
}

export default MySetting;
