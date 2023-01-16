import React from 'react';
import styled from 'styled-components';
import ruleBtn from '../../../assets/images/ruleBtn.svg';

function GameRule() {
  return (
    <StGameRule>
      <button>
        <img src={ruleBtn} alt="button" />
      </button>
      {/* <Title>나만 모른 닭 Game Rule:</Title> */}
      <RuleText>
        {/* {`1. 방 입장 시 입장 인원 전원에게 키워드가 부여된다. ex. '사과'\n2. 해당 키워드의 주제는 전체 공개된다. ex.'과일'\n3. 개인 키워드는 비공개이고, 타인의 키워드만 공개된다.\n4. 참가자들은 돌아가며 발언권을 얻고, 발언권이 없는 사람은 채팅으로 소통한다.\n5. 사람들에게 질문을 하고 답변에서 힌트를 얻어 자신의 키워드를 맞춘다.\n6. 발언권 시간이 끝남과 동시에 정답을 입력할 수 있다. 정답을 모르는 경우 [넘어가기]를 선택한다.\n7. 먼저 맞추는 사람이 게임의 승리자가 된다.`} */}
      </RuleText>
    </StGameRule>
  );
}

const StGameRule = styled.div``;

const Title = styled.text``;

const RuleText = styled.text``;

export default GameRule;
