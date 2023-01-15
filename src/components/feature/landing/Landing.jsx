// 외부 모듈
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 내부 모듈
import Button from '../../common/Button';
import TextButton from '../../common/TextButton';
import {
  getCookie,
  getNicknameCookie,
  removeCookie,
} from '../../../utils/cookies';
import MySetting from './MySetting';
import banner from '../../../assets/img/Group 3766.svg';
import chicken from '../../../assets/img/chickenFront.svg';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickname = getNicknameCookie('nickname');
  console.log('nickname', nickname);
  console.log(isLoggedIn);

  useEffect(() => {
    if (getCookie('my_token')) {
      console.log('cookie');
      setIsLoggedIn(true);
    }
  }, [getCookie]);

  function onClickLogOut() {
    removeCookie('my_token', 'nickname');
    alert('재밌었닭!');
    setIsLoggedIn(false);
  }

  return (
    <StLanding>
      <StHeader>
        {isLoggedIn ? (
          <div>
            <button onClick={onClickLogOut}>로그아웃</button>
            <div>반갑닭, {nickname}</div>
            <MySetting />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <TextButton>로그인</TextButton>
            </Link>
            <div>Guest는 로그인하고 이용해야한닭</div>
          </div>
        )}
      </StHeader>
      {/* 테스트 이미지 */}
      <Banner>
        <img src={banner} alt="banner_img" />
        <Charactar>
          <img src={chicken} alt="chicken_character" className="chicken" />
        </Charactar>
      </Banner>
      <StRuleBox>
        <h3>나만 모른 닭 Game Rule:</h3>
        <StRuleText>
          {`1. 방 입장 시 입장 인원 전원에게 키워드가 부여된다. ex. '사과'\n2. 해당 키워드의 주제는 전체 공개된다. ex.'과일'\n3. 개인 키워드는 비공개이고, 타인의 키워드만 공개된다.\n4. 참가자들은 돌아가며 발언권을 얻고, 발언권이 없는 사람은 채팅으로 소통한다.\n5. 사람들에게 질문을 하고 답변에서 힌트를 얻어 자신의 키워드를 맞춘다.\n6. 발언권 시간이 끝남과 동시에 정답을 입력할 수 있다. 정답을 모르는 경우 [넘어가기]를 선택한다.\n7. 먼저 맞추는 사람이 게임의 승리자가 된다.`}
        </StRuleText>
      </StRuleBox>
      <Link to="/rooms">
        <Button>게임하러 가기</Button>
      </Link>
    </StLanding>
  );
}

const StLanding = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin: 25vh; // 임시
`;

const Banner = styled.div`
  position: relative;
`;

const Charactar = styled.div`
  position: absolute;
  top: 10%;
  left: 36%;
  width: 360px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StHeader = styled.div``;

const StRuleBox = styled.div``;

const StRuleText = styled.div``;
export default Landing;
