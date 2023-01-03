import React from 'react';
import styled from 'styled-components';
import leftArrow from '../../../../assets/img/leftArrow.png';
import rightArrow from '../../../../assets/img/rightArrow.png';

function RoomListSliderLayout() {
  return (
    <StRoomListSliderLayout>
      <StArrowCon>
        <StLeftArrowBox>
          <PrevBtn>
            <img src={leftArrow} alt="leftArrow icon" />
          </PrevBtn>
        </StLeftArrowBox>
        <StRightArrowBox>
          <NextBtn>
            <img src={rightArrow} alt="rigntArrow icon" />
          </NextBtn>
        </StRightArrowBox>
      </StArrowCon>
    </StRoomListSliderLayout>
  );
}

const StRoomListSliderLayout = styled.div`
  width: 96%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StArrowCon = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PrevBtn = styled.div`
  border: 0;
  background: none;
  cursor: pointer;
`;

const StLeftArrowBox = styled.div`
  img {
    height: 260px;
  }
`;

const NextBtn = styled.div`
  border: 0;
  background: none;
  cursor: pointer;
`;

const StRightArrowBox = styled.div`
  img {
    height: 260px;
    transform: rotate(180deg);
  }
`;

export default RoomListSliderLayout;
