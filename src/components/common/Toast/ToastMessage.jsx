// 외부 모듈
import React, { useEffect } from 'react';
import styled from 'styled-components';

// 내부 모듈
import gameStart from 'assets/images/gameStart.svg';
import gameAnswer from 'assets/images/gameAnswer.svg';

function Toast({ setToastState, type }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <StBackground>
      <StToastBorder>
        {type === 'start' ? (
          <StToastMessage>
            <img src={gameStart} alt="게임 시작" />
          </StToastMessage>
        ) : (
          <StToastAnswer>
            <img src={gameAnswer} alt="게임 끝" />
          </StToastAnswer>
        )}
      </StToastBorder>
    </StBackground>
  );
}
const StBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 999;
`;

const StToastBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StToastMessage = styled.div`
  width: 908px;
  height: 278px;
`;

const StToastAnswer = styled.div`
  width: 618px;
  height: 453px;
`;

export default Toast;

/* 
토스트 메세지 사용법!

1. 사용하고자 하는 컴포넌트에 해당 파일을 import한다.
2. 사용하고자 하는 컴포넌트에 const [toastState, setToastState] = useState(false)를 추가한다.
3. 조건을 주고, 해당 조건을 만족하는 경우,  toast 메세지가 노출될 수 있도록 DOM return문 원하는 위치에 아래 코드를 삽입한다.
    {toastState === true ? (<Toast setToastState={setToastState} text="Game Start!" />) : null}
    - 여기서 toastmessage에 props로 넘기는 값은 setToastState와 text의 내용

p.s. 토스트 메세지의 디자인은 추후 변경될 예정이기 때문에 초안만 작성해준 상황입니다.
*/
