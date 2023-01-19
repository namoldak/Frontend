/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import LogOutTab from '../../../feature/Landing/MySettingTabs/LogOutTab';
import AccountTab from '../../../feature/Landing/MySettingTabs/AccountTab';

function MyPageModal(loggedIn) {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { id: 0, name: '계정', content: <LogOutTab loggedIn={loggedIn} /> },
    { id: 1, name: '탈퇴', content: <AccountTab /> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <div>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li
            key={el.id}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <StContent>
        <div>{menuArr[currentTab].content}</div>
      </StContent>
    </div>
  );
}

const TabMenu = styled.ul`
  position: absolute;
  top: 83px;
  left: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.yellowBrown};
  color: rgb(232, 234, 237);
  font-weight: bold;
  border-radius: 15px 15px 0px 0px;
  width: 300px;
  height: 55px;

  .submenu {
    display: flex;
    width: calc(100% / 2);
    height: 55px;
    padding: 15px;
    font-size: 15px;
    transition: 0.1s;
    border-radius: 15px 15px 0px 0px;
  }

  .focused {
    background-color: ${({ theme }) => theme.colors.lightBeige};
    color: rgb(21, 20, 20);
  }
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 10rem;
`;

export default MyPageModal;
