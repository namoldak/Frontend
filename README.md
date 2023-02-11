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

## ❗️ 페이지 별 기능

<details>
  <summary> 기능 안내 </summary>
  <br/>
  
| 페이지 | 기능 |
| ---- | ----- |
| 랜딩 | - 로그인된 유저/게스트 구분 |
| 로그인/회원가입 | - 카카오 로그인 <br /> - 유효성 검사 (모든 인풋 필드에 적용) <br/> - 닉네임, 이메일 중복 확인 |
| 로비 (게임룸 리스트) | - 배경음 자동 재생 <br /> - 방 생성/입장 <br /> - 방 제목 검색 <br> - 페이지네이션 |
| 게임룸 | - 텍스트 채팅 <br /> - 음성, 화상 채팅 <br /> - 게임 주제, 키워드 표시 <br /> - 뒤로가기 금지 <br /> - 정답 입력 모달 자동 생성 <br /> - 발언시간 타이머 표시 <br /> - 발언권 자동 이동 <br /> - 카메라, 마이크 비활성화 |
| 게시글 리스트 | - 게시글 조회 <br /> - 페이지네이션 <br /> - 제목으로 게시글 검색 <br /> - 카테고리별 게시글 조회 |
| 게시글 상세 | - 작성자일 경우, 게시글 수정/삭제 <br /> - 댓글 조회/등록/수정/삭제 <br /> - 댓글 무한 스크롤 |
| 게시글 작성/수정 | - 작성한 게시글 제목, 내용 작성/수정 |
| 설정 모달  | - 회원 정보 확인 <br /> - 닉네임 변경 및 중복 확인 <br /> - 로그아웃 <br /> - 회원 탈퇴 <br /> - 카카오 회원탈퇴 <br /> - 배경음 볼륨 조절 |
</details>
  
<br /> <br />

## ⚙️ 서비스 아키텍쳐
![나몰닭-아키텍쳐2](https://user-images.githubusercontent.com/117756400/216894689-8921deef-c813-42ca-a8f2-6e58f34fd4b8.jpg)

<br /> <br />

## 🗂️ 컴포넌트 구성

<details>
<summary>api</summary>

```
📦 api
 ┣ 📂 core
 ┃ ┗ 📜 axios.js
 ┗ 📜 authAsync.jsx
```
</details>

<details>
<summary>components</summary>

```
📦 components
 ┣ 📂 Community
 ┃ ┣ 📂 Comment
 ┃ ┃ ┣ 📜 Comment.jsx
 ┃ ┃ ┗ 📜 CreateComment.jsx
 ┃ ┣ 📂 Post
 ┃ ┃ ┣ 📜 ModifyPost.jsx
 ┃ ┃ ┣ 📜 Post.jsx
 ┃ ┃ ┣ 📜 PostDetail.jsx
 ┃ ┃ ┣ 📜 WritePost.jsx
 ┃ ┃ ┗ 📜 WriteSelect.jsx
 ┃ ┣ 📂 PostCategoryAndSearch
 ┃ ┃ ┣ 📜 PostSelect.jsx
 ┃ ┃ ┗ 📜 SearchPost.jsx
 ┃ ┣ 📜 Community.jsx
 ┃ ┗ 📜 Pagination.jsx
 ┣ 📂 GameRoom
 ┃ ┣ 📂 Timer
 ┃ ┃ ┣ 📜 SpotTimer.jsx
 ┃ ┃ ┗ 📜 Timer.jsx
 ┃ ┣ 📂 UserCardsAndChatBox
 ┃ ┃ ┣ 📜 Audio.jsx
 ┃ ┃ ┗ 📜 ChatBox.jsx
 ┃ ┗ 📜 GameRoomRTC.jsx
 ┣ 📂 Landing
 ┃ ┣ 📜 GameRule.jsx
 ┃ ┗ 📜 Landing.jsx
 ┣ 📂 Login
 ┃ ┣ 📜 KaKaoBtn.jsx
 ┃ ┗ 📜 Login.jsx
 ┣ 📂 RoomList
 ┃ ┣ 📂 RoomListHeader
 ┃ ┃ ┣ 📜 CreateRoom.jsx
 ┃ ┃ ┣ 📜 RoomListTopBar.jsx
 ┃ ┃ ┗ 📜 SearchRoom.jsx
 ┃ ┣ 📂 RoomListMain
 ┃ ┃ ┣ 📜 Room.jsx
 ┃ ┃ ┗ 📜 RoomListCard.jsx
 ┃ ┗ 📜 RoomList.jsx
 ┣ 📂 SignUp
 ┃ ┗ 📜 SignUp.jsx
 ┗ 📂 common
 ┃ ┣ 📂 Button
 ┃ ┃ ┣ 📜 BackButton.jsx
 ┃ ┃ ┣ 📜 Button.jsx
 ┃ ┃ ┣ 📜 SettingButton.jsx
 ┃ ┃ ┗ 📜 TextButton.jsx
 ┃ ┣ 📂 ImgUpload
 ┃ ┃ ┗ 📜 ImgUpload.jsx
 ┃ ┣ 📂 Input
 ┃ ┃ ┣ 📜 ChangeNickInput.jsx
 ┃ ┃ ┗ 📜 Input.jsx
 ┃ ┣ 📂 Layout
 ┃ ┃ ┣ 📜 CommunityContainer.jsx
 ┃ ┃ ┣ 📜 CommunityLayout.jsx
 ┃ ┃ ┣ 📜 CommunityWrapper.jsx
 ┃ ┃ ┣ 📜 Container.jsx
 ┃ ┃ ┣ 📜 Layout.jsx
 ┃ ┃ ┣ 📜 PostContainer.jsx
 ┃ ┃ ┣ 📜 PostLayout.jsx
 ┃ ┃ ┣ 📜 PostWrapper.jsx
 ┃ ┃ ┗ 📜 RoomListLayout.jsx
 ┃ ┣ 📂 Modals
 ┃ ┃ ┣ 📂 BasicModal
 ┃ ┃ ┃ ┣ 📜 CreateRoomModal.jsx
 ┃ ┃ ┃ ┣ 📜 DeleteAccountModal.jsx
 ┃ ┃ ┃ ┣ 📜 DeleteKaKaoAccountModal.jsx
 ┃ ┃ ┃ ┣ 📜 GameRuleModal.jsx
 ┃ ┃ ┃ ┣ 📜 Modal.jsx
 ┃ ┃ ┃ ┣ 📜 ModalForSetting.jsx
 ┃ ┃ ┃ ┣ 📜 RuleModal.jsx
 ┃ ┃ ┃ ┗ 📜 SettingModal.jsx
 ┃ ┃ ┣ 📂 InGameModal
 ┃ ┃ ┃ ┣ 📜 GameAnswerModal.jsx
 ┃ ┃ ┃ ┗ 📜 GameModal.jsx
 ┃ ┃ ┗ 📜 ModalPortal.jsx
 ┃ ┣ 📂 SettingTab
 ┃ ┃ ┣ 📂 BGM
 ┃ ┃ ┃ ┗ 📜 BGMTab.jsx
 ┃ ┃ ┣ 📂 DeleteAccount
 ┃ ┃ ┃ ┗ 📜 DeleteAccountTab.jsx
 ┃ ┃ ┗ 📂 LogOut
 ┃ ┃ ┃ ┣ 📜 ChangeNick.jsx
 ┃ ┃ ┃ ┗ 📜 LogOutTab.jsx
 ┃ ┗ 📂 Toast
 ┃ ┃ ┗ 📜 ToastMessage.jsx
 
```

</details>

<details>
<summary>hooks</summary>

```
📦 hooks
 ┣ 📜 useDebounce.jsx
 ┣ 📜 useDidMountEffect.jsx
 ┣ 📜 useEffectSound.jsx
 ┣ 📜 usePreventGoBack.jsx
 ┣ 📜 usePreventRefesh.jsx
 ┗ 📜 useToast.jsx
 
```

</details>

<details>
<summary>pages</summary>

```
📦pages
 ┣ 📜 CommunityPage.jsx
 ┣ 📜 GameRoomPage.jsx
 ┣ 📜 LandingPage.jsx
 ┣ 📜 LoginPage.jsx
 ┣ 📜 ModifyPostPage.jsx
 ┣ 📜 PostPage.jsx
 ┣ 📜 RoomListPage.jsx
 ┣ 📜 SignupPage.jsx
 ┗ 📜 WritePostPage.jsx
 
```

</details>

<details>
<summary>redux</summary>

```
📦 redux
 ┣ 📂 config
 ┃ ┗ 📜 configStore.js
 ┣ 📜 errorToastMsg.jsx
 ┣ 📜 postSlice.jsx
 ┣ 📜 roomSlice.jsx
 ┗ 📜 soundSlice.jsx
```

</details>

<details>
<summary>shared</summary>

```
📦 shared
 ┗ 📜 Router.jsx
```

</details>

<details>
<summary>styles</summary>

```
📦 styles
 ┣ 📜 GlobalStyle.js
 ┣ 📜 font.css
 ┗ 📜 theme.js
```

</details>

<details>
<summary>utils</summary>

```
📦 utils
 ┣ 📜 cookies.jsx
 ┗ 📜 date.js
```

</details>

<br /> <br />

## 🪄 핵심 기술
- 실시간 채팅을 위한 Web Socket
  - 화상 및 음성 채팅을 위한 WebRTC
  - 다양한 브라우저 환경을 지원하기 위한 SockJS
  - pub/sub 기반의 편리한 웹소켓 관리를 위한 메세징 프로토콜 STOMP
- Access Token과 Refresh Token을 이용한 JWT 인증
- Intersection-observer API를 사용한 댓글 무한 스크롤
- OAuth 2.0 소셜 로그인을 통한 편리한 접근성

<br /> <br />

## 📝 기술적 의사 결정
<details>
<summary>기술적 의사 결정</summary>
<div markdown="1">

| 기술 | 도입 이유 | 후보군 | 의견 조율 및 기술 결정 |
| --- | --- | --- | --- |
| Redux-Toolkit | 컨포넌트 내에서 관리하는 상태값이 페이지 이동으로 인해 유지되지 않는 문제가 생김.상태의 일관성을 유지하기 위해 전역으로 상태값을 저장할 수 있는 방법이 필요했음. | redux <br /> redux-toolkit | recoil의 경우, react와 호환성이 좋고, 충분히 가볍고, 러닝커브가 낮지만, 한정된 시간 동안 문제를 해결할 때 헤메인다면 필요 이상의 시간이 소모될 수 있음. 리덕스는 리액트 뿐만 아니라 모든 프레임워크에서 사용이 가능하기에, 추후 다른 프레임워크를 배울 때 도움이 될 것으로 예상됨. 리덕스 툴킷은 리덕스보다 코드가 간결하고 전용 dev tool, 사용에 있어 익숙함 등, 개발 시 문제가 생길 경우 보다 빠르게 원인을 찾아낼 수 있을 것이라고 판단하여  redux toolkit을 사용하기로 결정. |
| Infinite Scroll | 게시글 상세페이지에서 유저가 게시글에 초점을 맞춰 읽다가 댓글을 읽고 싶은 경우 일정한 데이터를 순차적으로 보여주기 위함. | Pagination <br /> Infinite Scroll | scroll height 를 구해서 dabouncing과 throttling을 사용하는 경우 스크롤을 할 때마다 이벤트가 발생하므로 reflow 단계가 계속 일어남. <br />Intersection Observer API 를 사용하는 경우 타겟의 변화를 관찰하여 스크롤시 지정된 수만큼 데이터가 요청되며 렌더링됨.<br /> 타겟이 얼마만큼 보였을 때 콜백함수를 실행할지 지정할 수 있다는 점도 장점임.  <br/>scroll이 일어날 때 마다 특정 element가 화면에 존재하는지에 대한 여부를 계속 계산하는 것은 비효율적이라고 판단하였음. <br /> 따라서 Intersection Observer API 를 사용함 |
| axios(instance) | API를 연동할 때 axios를 사용하면 자동으로 JSON 데이터 형식으로 변환이 가능하고 XSRF의 보호를 받기 때문 | fetch <br /> axios | axios를 사용하는 경우 JSON 데이터를 자동 변환해줌. 또한 400, 500 대의 에러가 발생한 경우 rejectfh response를 전달해 catch로 잡아낼 수 있음. <br /> axios 를 인스턴스화하여 baseURL 과 token을 사용하는 컴포넌트들에서 instance를 호출하여 사용할 수 있어 편리하므로 axios 를 사용하는 것으로 결정함. |
| styled-components | JavaScript로 작성된 컴포넌트에 스타일을 바로 정의하는 Css-in-Js 방식을 사용하여 빠르게 프로젝트를 진행시키기 위함. | Sass <br /> Styled-components | styled component를 사용할 경우, Sass의 다양한 스타일링이라는 장점을 props를 참조하여 대체할 수 있음.<br /> 하지만 className 지정은 전역으로 관리될 경우 중복될 가능성이 높아보임.<br /> styled component가 빠른 페이지 로드에 불리하고 하더라도, 동적인 이벤트가 적고 작은 규모의 프로젝트에는 크게 영향이 없을 것이라 판단함. <br />또한, 재사용 측면에 있어서 반복적인 규칙은 theme.js 파일을 작성하여 사용할 수 있다고 생각하여 최종적으로 styled-component를 사용하기로 결정. |

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
  1. 유저의 미디어 정보를 얻어오는 로직에 try-catch 문을 사용하여 error 처리 <br />
  2. 미디어 차단 사용자를 위해, 타 사용자들의 프로필 정보를 담고 화면에 보여주는 users
  배열의 유저 각각 객체의 값을 유저 입장시 최초에 CreatePeerConnectio 함수 안에서
  미디어 차단 사용자 기준으로 생성하였음 <br />
  3. 이후에 미디어 허용 사용자라면 만들어진 PeerConnection의 ontrack 이벤트를 사용하여  해당이벤트 발생시
  users배열에서 해당 유저 객체를 삭제 후 미디어 허용 사용자 기준으로 재 생성 하여 주었음 <br />
  <br />
</div>
</details>
<details>
<summary>실시간 채팅이 쌓이지 않고 교체만 되던 문제</summary>
<div markdown="1">

- **문제 상황**  
  - 실시간 채팅이 쌓이지 않고 기존 채팅에서 새로운 채팅으로 교체되는 문제
  
- **이유**  
  - 데이터를 저장하는 함수가 비동기로 동작하여, 최신 데이터로 업데이트 하기 전 callback 함수가 실행되기 때문

- **해결 방법**  
  - updater 로 데이터를 넘겨주면 순차적으로 상태값이 변경되고, 상태가 변경된 이후 callback 이 요청되므로 동기화 작업이 진행됨.
    setChatMessages((chatMessages) => [...chatMessages, data]) 이렇게 데이터를 동기적으로 호출하여 해결함.
    비동기 작업처럼 상태값 변경을 일괄 처리(Batch)하므로, 불필요한 리렌더링으로 인한 성능 저하는 야기되지 않을 것임.
  <br />
</div>
</details>
<details>
<summary>무한스크롤 댓글 조회</summary>
<div markdown="1">

- **문제 상황**  
  - 게시글 상세 페이지에서 댓글을 무한 스크롤로 보여줄 때 다른 게시글에서도 동일한 댓글이 보이는 문제

- **이유**  
  - observer가 데이터를 탐색할 때 댓글을 저장한 배열을 참조하는데 댓글 데이터들이 전역으로 관리되고 있었기 때문

- **해결 방법**  
  - 상세 페이지에서만 댓글 전체 조회 api를 호출했고 렌더링 시 데이터를 일부만 로딩하도록 하여 해결
  <br />
</div>
</details>
<details>
<summary>닉네임 변경 및 중복 확인</summary>
<div markdown="1">

- **문제 상황**  
  - 닉네임 중복 확인 버튼을 눌렀는데 닉네임이 중복 확인 검사 없이 바로 변경됨

- **이유**  
  - form 태그 안에서는 버튼을 하나만 눌러도 submit function이 실행되었기 때문

- **해결 방법**  
  - 버튼의 onClick 함수에 event.preventDefault( );  메서드를 써서 기본으로 정의된 이벤트를 작동하지 못하게 막음
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
    - 컴포넌트 최상단 scope에 키워드를 저장할 let 변수 선언 후 게임 시작 시 서버로부터 받아온 키워드 데이터를 해당 변수에 할당하여 게임종료시 해당 변수 하여 키워드 화면에 출력  
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
- Js 타입 에러를 사전에 방지하여 개발 생산성을 향상시키기 위한 typescript
- 서버 비동기 통신 데이터 관리를 용이하게 하기 위한 react-query
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
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"> <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> <img src="https://img.shields.io/badge/Forever-41454A.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMTI3IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PHBhdGggZD0iTTAgNjMuMjFjMC0xNy4zMjQgNi4yMDQtMzIuMTkgMTguNjEyLTQ0LjU5OEMzMS4wMiA2LjIwNCA0NS44ODYgMCA2My4yMSAwYzE3LjMyNCAwIDMyLjE5IDYuMjA0IDQ0LjU5OCAxOC42MTJsMjAuMzY4IDE5LjMxNCAyMC4zNjctMTkuNjY1QzE2MC43MTcgNi4wODcgMTc1LjQ2NiAwIDE5Mi43OSAwYzE3LjA5IDAgMzEuODk4IDYuMjA0IDQ0LjQyMyAxOC42MTJDMjQ5LjczOCAzMS4wMiAyNTYgNDUuODg2IDI1NiA2My4yMWMwIDE3LjMyNC02LjI2MiAzMi4xOS0xOC43ODcgNDQuNTk4LTEyLjUyNSAxMi40MDgtMjcuMzMzIDE4LjYxMi00NC40MjMgMTguNjEyLTE3LjMyNCAwLTMyLjE5LTYuMjA0LTQ0LjU5OC0xOC42MTJsLTIwLjAxNi0xOS4zMTQtMjAuNzIgMTkuNjY1Yy0xMi4xNzMgMTIuMTc0LTI2LjkyMiAxOC4yNi00NC4yNDYgMTguMjZzLTMyLjE5LTYuMjAzLTQ0LjU5OC0xOC42MTFDNi4yMDQgOTUuNCAwIDgwLjUzNCAwIDYzLjIxWk02My4yMSAzNi41MmMtNy4yNTggMC0xMy41MiAyLjYzNC0xOC43ODggNy45MDEtNS4yNjcgNS4yNjgtNy45IDExLjUzLTcuOSAxOC43ODggMCA3LjQ5MSAyLjU3NCAxMy44MTIgNy43MjUgMTguOTYzIDUuMTUgNS4xNSAxMS40NzEgNy43MjUgMTguOTYzIDcuNzI1IDcuNDkxIDAgMTMuODEyLTIuNTc1IDE4Ljk2My03LjcyNWwxOS4zMTQtMTguOTYzLTE5LjMxNC0xOC42MTJjLTUuMzg1LTUuMzg0LTExLjcwNi04LjA3Ny0xOC45NjMtOC4wNzdabTE0OC41NDMgNDUuNjUyYzUuMTUtNS4xNSA3LjcyNi0xMS40NzIgNy43MjYtMTguOTYzIDAtNy40OTItMi41NzUtMTMuODEzLTcuNzI2LTE4Ljk2My01LjE1LTUuMTUtMTEuNDEzLTcuNzI2LTE4Ljc4Ny03LjcyNi03LjM3NSAwLTEzLjYzNyAyLjU3NS0xOC43ODggNy43MjZMMTU0LjUxMyA2My4yMWwxOS4zMTQgMTguNjEyYzUuMTUgNS4xNSAxMS40NzIgNy43ODQgMTguOTYzIDcuOSA3LjQ5Mi4xMTggMTMuODEzLTIuMzk5IDE4Ljk2My03LjU1WiIvPjwvc3ZnPg==&style=for-the-badge">
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
