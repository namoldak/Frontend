// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from '../../../common/Modals/BasicModal/Modal';
import CreateRoomModal from '../../../common/Modals/BasicModal/CreateRoomModal';
import createRoomBtn from '../../../../assets/images/createRoomBtn.svg';

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
        <img src={createRoomBtn} alt="방 만들기 버튼" />
      </CreateRoomBtn>
    </StCreateRoom>
  );
}

const StCreateRoom = styled.div``;

const CreateRoomBtn = styled.button`
  width: 238px;
  height: 80px;
  margin-top: 10px;
`;

export default CreateRoom;
