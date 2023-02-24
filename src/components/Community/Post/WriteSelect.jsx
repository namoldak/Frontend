// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import select from 'assets/images/select.svg';

function WriteSelect({ setCategoryCheck }) {
  const [currentValue, setCurrentValue] = useState('자유 게시판');
  const [showOptions, setShowOptions] = useState(false);

  function onClickSelect(e) {
    const { innerText } = e.target;
    setCurrentValue(innerText);

    if (innerText === '자유 게시판') {
      setCategoryCheck('freeBoard');
    } else {
      setCategoryCheck('feedbackBoard');
    }
  }

  function onClickCategory() {
    setShowOptions((prev) => !prev);
  }

  return (
    <SelectBox onClick={onClickCategory}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        <Option value="freeBoard" onClick={onClickSelect}>
          자유 게시판
        </Option>
        <Option value="feedbackBoard" onClick={onClickSelect}>
          피드백 남기기
        </Option>
      </SelectOptions>
    </SelectBox>
  );
}

const SelectBox = styled.div`
  position: relative;
  width: 205px;
  height: 54px;
  background: ${({ theme }) => theme.colors.lightBeige};
  border: 6px solid ${({ theme }) => theme.colors.yellowBrown};
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
  margin-left: 12px;
  cursor: pointer;

  &::before {
    content: url(${select});
    position: absolute;
    top: 14px;
    right: 20px;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.text3};
`;

const SelectOptions = styled.ul`
  position: absolute;
  top: 40px;
  left: -6px;
  width: 205px;
  height: 96px;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.lightBeige};
  border-width: ${(props) => (props.show ? '6px' : '0')};
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.yellowBrown};
  border-radius: 0 0 10px 10px;
`;

const Option = styled.li`
  height: 42px;
  padding: 10px 20px 10px 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.text3};
  transition: background-color 0.2s ease-in;
  border-bottom: 1px solid rgba(48, 48, 48, 0.25);
  border-width: 80%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellowBeige};
  }

  &:last-child {
    border: 0;
  }
`;

export default WriteSelect;
