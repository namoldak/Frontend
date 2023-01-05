// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from '../../../common/Modals/Modal';
import CreateRoomModal from '../../../common/Modals/CreateRoomModal';

function CreateRoom() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <StCreateRoom>
      {isModalOn && (
        <Modal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<CreateRoomModal />}
        />
      )}
      <CreateRoomBtn
        onClick={() => {
          setIsModalOn(true);
        }}
      >
        방 만들기
      </CreateRoomBtn>
    </StCreateRoom>
  );
}

const StCreateRoom = styled.div``;

const CreateRoomBtn = styled.button`
  font-size: 20px;
  background: none;
  padding: 10px;
  cursor: pointer;
`;

export default CreateRoom;
