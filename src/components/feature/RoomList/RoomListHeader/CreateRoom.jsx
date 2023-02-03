// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import Modal from 'components/common/Modals/BasicModal/Modal';
import CreateRoomModal from 'components/common/Modals/BasicModal/CreateRoomModal';
import createRoomBtn from 'assets/images/createRoomBtn.svg';

function CreateRoom() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <>
      {isModalOn && (
        <Modal
          onClose={() => {
            setIsModalOn(false);
          }}
          content={<CreateRoomModal />}
        />
      )}
      <StCreateRoomBtn
        onClick={() => {
          setIsModalOn(true);
        }}
      >
        <img src={createRoomBtn} alt="방 만들기" />
      </StCreateRoomBtn>
    </>
  );
}

const StCreateRoomBtn = styled.button`
  /* width: 238px; */
  height: 78px;
  /* margin-top: 10px; */
  margin-left: 30px;

  img {
    width: unset;
    height: unset;
  }

  @media ${(props) => props.theme.laptop} {
    img {
      height: 78px;
    }
  }
`;

export default CreateRoom;
