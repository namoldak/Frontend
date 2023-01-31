// 외부 모듈
import React, { useState } from 'react';
import styled from 'styled-components';

// 내부 모듈
import ModalForSetting from 'components/common/Modals/BasicModal/ModalForSetting';
import SettingModal from 'components/common/Modals/BasicModal/SettingModal';
import settingBtn from 'assets/images/settingBtn.svg';

function SettingBtn() {
  const [isSettingModalOn, setIsSettingModalOn] = useState(false);

  return (
    <div>
      {isSettingModalOn && (
        <ModalForSetting
          onClose={() => {
            setIsSettingModalOn(false);
          }}
          content={<SettingModal setting={setIsSettingModalOn} />}
        />
      )}
      <StSettingBtn
        onClick={() => {
          setIsSettingModalOn(true);
        }}
      >
        <img src={settingBtn} alt="설정" />
      </StSettingBtn>
    </div>
  );
}

const StSettingBtn = styled.button`
  height: 78px;
`;

export default SettingBtn;
