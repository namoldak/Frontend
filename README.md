![나몰닭깃헙상단이미지](https://user-images.githubusercontent.com/117756400/216939133-6d703bcf-80ce-4939-ada5-a583af07185e.jpg)

<br /> <br />

## 🐔 나만 모른 닭
<div align=center>

***내 머리에 있는 거 뭐야? 나만 몰라?***  
”양세찬 게임” 혹은 “콜 마이 네임”으로 불리는 *키워드 맞추기* 게임!  
스무고개처럼 상대 플레이어에게 질문하면서 나의 키워드를 맞춰보세요🐤  
최대한 <u>헷갈리게 답변</u>하고 최대한 <u>날카롭게 질문</u>하세요!  
<br />
![나몰닭상단이미지](https://user-images.githubusercontent.com/117756400/216971099-fff770a8-8462-4ad0-91f1-64463703bf5f.png)  
</div>

<br /> <br />

## 🔗 나만 모른 닭 서비스 및 노션
### [🐔나만 모른 닭 바로가기🐔](https://namoldak.com)
### [🐔팀 노션🐔](https://www.notion.so/ad96dfad0856455c922e9d0f756a7f60)
### [🐔브로슈어🐔](https://colossal-chokeberry-fec.notion.site/39515b59c604426494e905a62410ce3b)

<br /> <br />

## 📽 시연 영상
<div align=center>

![800px](https://user-images.githubusercontent.com/111271565/217049760-c3694076-b5be-41c5-9951-f148aee3bb92.gif)

</div>

<br /> <br />

## 📢 주요 서비스 기능
<ul>
<li> 런닝맨에 나온 양세찬 게임(aka. call my name game)을 온라인에서도 즐길 수 있게 웹으로 구현하였습니닭🐔 </li>
<li> 텍스트 채팅뿐만 아니라 음성/화상 채팅으로도 서로 대화를 나누며 게임을 즐길 수 있습니닭🐔 </li>
<li> 게임도 하고 게시판을 이용해 다른 유저들과 소통도 할 수 있습니닭🐔 </li>
<li> 소셜 로그인이 있어 별도의 회원가입이 필요하지 않습니닭🐔 </li>
</ul>

<br /> <br />

## ⚙️ 서비스 아키텍쳐
![나몰닭-아키텍쳐2](https://user-images.githubusercontent.com/117756400/216894689-8921deef-c813-42ca-a8f2-6e58f34fd4b8.jpg)

<br /> <br />

## 🪄 핵심 기술
- 실시간 채팅을 위한 Web Socket
  - 화상 및 음성 채팅을 위한 WebRTC
  - 다양한 브라우저 환경을 지원하기 위한 SockJS
  - pub/sub 기반의 편리한 웹소켓 관리를 위한 메세징 프로토콜 STOMP
- Refresh Token의 생명 주기 관리를 위한 서브 데이터베이스로의 Redis 사용
- 개발자 편의 및 생산성 증가를 위한 자동화 배포 CI/CD
- AWS CloudFront를 이용한 S3 이미지 엔드포인트 보안 강화
- Intersection-observer API를 사용한 댓글 무한 스크롤
- OAuth 2.0 소셜 로그인을 통한 편리한 접근성

<br /> <br />

## 📝 기술적 의사 결정
<details>
<summary>기술적 의사 결정</summary>
<div markdown="1">

| 기술 | 도입 이유 | 후보군 | 의견 조율 및 기술 결정 |  
|:---:|---|---|---|
| Web Socket | 실시간 통신을 위해 도입 | Polling / Long Polling / Web Socket | - 실시간성이 중요한 서비스이므로 한쪽에서 송신을 하면 반대쪽에서는 수신만 할 수 있는 Polling 및 Long Polling은 Web Socket에 비해 실시간성이 떨어짐.<br />- Web Socket을 사용하면 서버와 브라우저 사이에 양방향 소통이 가능함(= 전 이중 통신, 양방향 통신 (Full-Duplex)). 즉, 클라이언트가 먼저 요청하지 않아도 서버가 먼저 데이터를 보낼 수 있고 상대방의 송신 상태와 상관없이 메세지를 보낼 수 있음. 때문에 30초의 제한 시간 내에 많은 질문이 오가는 실시간 채팅이 중요한 우리 서비스에 Web Socket이 더 적절하다고 판단 |
| WebRTC (Mesh) | 실시간 화상 및 음성 채팅 | Mesh / SFU / MCU | - 실시간성이 가장 낮고 중앙 서버에서 데이터 혼합 및 가공에 많은 비용이 요구되는 MCU는 제외하고 Mesh와 SFU 방식을 놓고 고민<br />- 서비스 특성 상, 한 게임룸의 최대 인원이 4명인 점을 고려했을 때 peer간의 직접 연결이 클라이언트에 부하를 심하게 주지 않을 것이라고 판단했고, 서버를 거치는 일 없이 바로 peer끼리 정보를 주고 받는 것이 실시간성이 중요한 게임 서비스에 적합하다고 판단 |
| STOMP & SockJS | 텍스트 채팅 및 다양한 브라우저에서의 일관성 | Only WebSocket / SockJS + STOMP | - 여러 브라우저에서 동일한 기능을 안정적으로 제공할 수 있어야 하기에 SockJS를 사용하고, 여러 방을 생성하여 그 방마다의 채팅을 관리해야 하기 때문에 Topic을 구독함으로 별도의 세션 관리가 필요없는 STOMP를 사용해 채팅을 구현하는 것으로 의견 조율<br />- WebSocket Configuration에서 Endpoint에 SockJS를 사용할 수 있게 설정하고, 메시지 브로커를 통해 pub/sub 엔드포인트를 설정하여 url로 간단히 공급과 구독을 적용할 수 있게 구현함. 또한 대상 Topic(게임 방)을 구독한 사람들을 대상으로 게임 진행에 관련한 메세지를 공급하는 방식으로 구현 |
<div>
</details>
<br /> <br />

## ⚽ 트러블 슈팅
<details>
<summary>카메라, 마이크(미디어) 미사용자 게임 참가 시 실행 이슈</summary>
<div markdown="1">

- **문제 상황**
  - 카메라,마이크 사용 차단을 한 유저는 게임에 참가 시 게임 진행이 안 됨

- **이유**  
  - 유저의 미디어 정보를 얻어오는 로직에서 미디어 사용 차단, 또는 미디어가 없을 경우 오류가 발생

- **해결 방법**  
  1. 유저의 미디어 정보를 얻어오는 로직에 try-catch 문을 사용하여 error 처리
  2. 미디어 차단 사용자를 위해, 타 사용자들의 프로필 정보를 담고 화면에 보여주는 users 배열 안에 유저 각각 객체의 값을 최초에 미디어 차단 사용자 기준으로 생성,  이후에 미디어 허용 사용자라면 users배열에서 해당 유저 객체를 삭제 후 미디어 허용 사용자 기준으로 재 생성 하여 주었음
  <br />
</div>
</details>
<details>
<summary>실시간 채팅이 쌓이지 않고 교체만 되던 문제</summary>
<div markdown="1">

- **문제 상황**  
  - 실시간 채팅이 쌓이는 것을 구현하기 위해 setChatMessages([...chatMessages, data])의 형태로 코드를 짰으나 기존 채팅에서 새로운 채팅으로 교체만 되는 문제

- **이유**  
  - setState()가 비동기로 동작하기 때문. …chatMessages 전개연산자가 변경된 채팅 state가 아닌 업데이트되지 않은 state만 가져오는 것이 원인

- **해결 방법**  
  - setState() 함수에서 이전 state 값을 기준으로 값을 계산해야 한다면, 객체 대신 updater 함수를 전달해야 함. 따라서  setChatMessages((chatMessages) => [...chatMessages, data]) 이렇게 코드를 썼고 문제를 해결했음.
  <br />
</div>
</details>
<details>
<summary></summary>
<div markdown="1">

- **문제 상황**  
  - 

- **이유**  
  - 

- **해결 방법**  
  - 
  <br />
</div>
</details>
<details>
<summary></summary>
<div markdown="1">

- **문제 상황**  
  - 

- **이유**  
  - 

- **해결 방법**  
  -  
  <br />
</div>
</details>

<br /> <br />

## 🗨️ User Feedback
1. 닉네임 변경
    - 기존에 닉네임을 cookie 에 담아 관리하고 있었는데 닉네임 변경 api를 호출하고 변경된 닉네임을 주기로 함  
2. 카메라 기본 상태 off로 설정
    - 각각의 유저 정보를 객체로서 저장하여 요소로 가지는 배열에 유저 객체를 처음 할당할 때 카메라 On/Off를 설정하는 프로퍼티의 값을 true에서 false로 변경 
3. 게임 종료 시 키워드 알림
    - 컴포넌트 최상단 scope에 키워드를 저장할 let 변수 선언 후 게임 시작 시 서버로부터 받아온 키워드 데이터를 해당 변수에 할당하여 게임종료시 해당 변수 사용하여 키워드 화면에 출력  
4. 커뮤니티 페이지 카테고리 설정 방식 변경
    - 카테고리의 경우 [자유게시판]과 [내가 쓴 피드백]은 drop down으로, [내가 쓴 게시판]의 경우엔 버튼으로 따로 구성되어있어서 불편하다는 피드백을 받음  
    - 모든 카테고리를 drop down으로 변경  
5. 카카오톡 회원탈퇴 (서비스 연결 끊기)
    - 카카오 로그인 시 백엔드 서버에서 전달하는 토큰에 카카오 access token을 추가하고, 카카오톡 연결 끊기 api로 해당 토큰을 전송하여 서비스 연결 끊기 요청  
6. 버튼 중복 클릭 방지
    - debounce와 동일한 기능을 하는 커스텀 훅을 만들어서 버튼을 여러 번 눌렀을 때 특정 시간(0.3초)동안 액션이 없는 경우 함수가 호출되도록 변경  
7. 게임 플레이 시 효과음
    - howler.js 라이브러리를 사용하여 삽입한 src가 플레이되는 커스텀 훅을 만들어서 게임 중 효과음이 나오도록 변경  

<br /> <br />

## ⌛ 시간이 더 있었다면 도전했을 기술들
- github actions 를 이용한 CI/CD
- 디자인 시스템 atomic design pattern
- 추가적인 소셜 로그인(네이버, 구글)
<br /> <br />
  
## 🛠 기술 스택
### Frontend Tech Stacks
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<br />
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white"> <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black"> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<br />
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/sockJS-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white">
<br /> <br />

### Infrastructure  
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"> <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<br /> <br />
  
### Team Collaboration Tool  
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<br />

<br /><br />

## 🛠 그 외 라이브러리
- hookform/resolvers: 2.9.10 
- stomp/stompjs: 6.1.2
- eslint-plugin-prettier: 4.2.1
- history: 5.3.0
- howler: 2.2.3
- react-cookie: 4.1.1
- react-dom: 18.2.0
- react-redux: 8.0.5
- react-router-dom: 6.6.1
- react-scripts: 5.0.1
- react-toastify: 9.1.1
- redux: 4.2.0
- styled-reset: 4.4.5
- use-search-params: 1.0.4
- web-vitals: 2.1.0
- yup: 0.32.11

<br /> <br />

## 🧑🏻‍💻 개발 기간 & 조원
✔️ 2022.12.30 - 2022.02.09
<br />
✔️ 멤버 이름 클릭 시, 해당 멤버의 깃허브를 방문하실 수 있습니다.
<br />
|  [김현빈](https://github.com/kimmy199535)  | [이정민](https://github.com/kkookk55) | [최수빈](https://github.com/123456soobin-choi) | 정희애 |
|:---:|:---:|:---:|:---:|
| ![현빈님캐릭터](https://user-images.githubusercontent.com/117756400/216781489-d5e60509-684d-4636-b7e6-af714a2d921c.png) | ![정민님캐릭터](https://user-images.githubusercontent.com/117756400/216781452-8767b30e-5180-4270-8685-448b87cde9a7.png) | ![수빈님캐릭터](https://user-images.githubusercontent.com/117756400/216781532-113c826a-a330-4573-8a13-525446a61e0b.png) | ![희애님캐릭터](https://user-images.githubusercontent.com/117756400/216781821-9adf9b05-907a-4d55-8ac4-11c09534a3c1.png) |
| FE/REACT | FE/REACT | FE/REACT | DESIGN |

<br /> <br /> <br />
