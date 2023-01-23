// 외부 모듈
import React from 'react';
import styled from 'styled-components';

function GameRuleModal() {
  return (
    <StModalContainer>
      <StTitle>
        게임 룰<br /> 제한시간 : 30초
      </StTitle>
      <StContent>
        1. 게임은 최소인원 3~4명까지 진행할 수 있습니다.
        <br />
        2. 방장이 게임 시작을 하게 되면, 30초의 제한 시간을 두고 게임이 진행이
        됩니다.
        <br />
        3. 참여자 전원 머리 위에 키워드가 공지가 되며, 본인의 키워드는 확인할 수
        없습니다. <br />
        4. 참여자 전원 한명씩 돌아가면서 음성으로 발언권이 부여됩니다.
        <br />
        5. 발언권을 부여받은 사람은 본인 키워드에 대한 질문을 할 수 있습니다.
        <br />
        6. 제한시간 30초가 지나면, 발언권을 부여받은 사람이 정답을 입력합니다.
        <br />
        7. 3~4명의 참가자 중 정답자가 나오면 게임이 자동으로 종료가 됩니다.
      </StContent>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  width: 786px;
  height: 459px;
  gap: 30px;
  color: white;
`;

const StTitle = styled.p`
  font-size: 26px;
  line-height: 36px;
  text-align: center;
`;

const StContent = styled.p`
  font-size: 20px;
  line-height: 38px;
  text-align: left;
`;

export default GameRuleModal;
