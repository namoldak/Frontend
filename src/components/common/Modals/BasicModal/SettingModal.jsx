// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import LogOutTab from 'components/common/SettingTab/LogOut/LotOutTab';
import AccountTab from 'components/common/SettingTab/DeleteAccount/DeleteAccountTab';
import BGMTab from 'components/common/SettingTab/BGM/BGMTab';
import { createBrowserHistory } from 'history';

function SettingModal({ setting }) {
  const [currentTab, setCurrentTab] = useState(0);
  const history = createBrowserHistory();

  const menuArr = [
    {
      id: 0,
      name: '계정',
      content: <LogOutTab setting={setting} />,
    },
    { id: 1, name: '탈퇴', content: <AccountTab setting={setting} /> },
  ];

  const lobbyMenuArr = [
    {
      id: 0,
      name: '계정',
      content: <LogOutTab setting={setting} />,
    },
    { id: 1, name: '탈퇴', content: <AccountTab setting={setting} /> },
    { id: 2, name: '사운드', content: <BGMTab setting={setting} /> },
  ];

  // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
  // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <StSettingModal>
      {history.location.pathname === '/rooms' ? (
        <>
          <TabMenu>
            {lobbyMenuArr.map((el, index) => (
              <li
                key={el.id}
                className={index === currentTab ? 'submenu focused' : 'submenu'}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </TabMenu>
          <StContentBack>
            <div>{lobbyMenuArr[currentTab].content}</div>
          </StContentBack>
        </>
      ) : (
        <>
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
          <StContentBack>
            <div>{menuArr[currentTab].content}</div>
          </StContentBack>
        </>
      )}
    </StSettingModal>
  );
}

const StSettingModal = styled.div`
  display: flex;
  width: 920px;
  margin-top: 125px;
  margin-left: 103px;
`;

const StContentBack = styled.div`
  background: rgba(4, 2, 0, 0.6);
  border-radius: 0px 30px 30px 30px;
  width: 745px;
  height: 474px;
  padding: 30px;
`;

const TabMenu = styled.ul`
  display: flex;
  flex-direction: column;
  color: #fce7b3;
  font-weight: 800;
  font-size: 26px;
  line-height: 31px;
  letter-spacing: 0.2em;
  cursor: pointer;

  .submenu {
    display: flex;
    justify-content: center;
    width: 175px;
    height: 94px;
    background: rgba(4, 2, 0, 0.8);
    border-radius: 30px 0px 0px 30px;
    padding-top: 30px;
    transition: all 0.1s;
  }

  .focused {
    background: rgba(4, 2, 0, 0.6);
    color: #${({ theme }) => theme.colors.white};
    font-size: 30px;
    line-height: 36px;
  }
`;

export default SettingModal;
