import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useCookies } from 'react-cookie';
import { getNicknameCookie } from '../../../../utils/cookies';

function ChatBox() {
  const client = useRef({});
  const param = useParams();
  const [cookie] = useCookies();
  const nickname = getNicknameCookie('nickname');
  const [message, setMessage] = useState(''); // input value 값
  const [chatMessages, setChatMessages] = useState([]); // 누적 채팅 메시지들
  const [chatUser, setChatUser] = useState([]); // 누적 유저 이름들
  const [chatData, setChatData] = useState([]); // 실시간 채팅 데이터 type 계속 바뀜
  // const allMessages = [];
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  const subscribe = () => {
    client.current.subscribe(
      `/sub/gameroom/${param.roomId}`,
      async ({ body }) => {
        const data = JSON.parse(body);
        setChatData(data); // 함수 밖에서 data를 사용하기 위함
        // console.log('subscribe data', chatData);
        switch (data.type) {
          case 'ENTER': {
            // console.log('enter');
            break;
          }
          case 'CHAT': {
            // console.log('chat', data.sender);
            setChatMessages((chatMessages) => [...chatMessages, data.message]);
            setChatUser((chatUser) => [...chatUser, data.sender]);
            break;
          }
          default: {
            // console.log('default');
            break;
          }
        }
      },
    );
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(`http://13.209.84.31:8080/ws-stomp`),
      connectHeaders,
      debug() {},
      onConnect: () => {
        subscribe();
        client.current.publish({
          destination: `/sub/gameroom/${param.roomId}`,
          body: JSON.stringify({
            type: 'ENTER',
            roomId: param.roomId,
            sender: nickname,
            message: `${nickname}님이 게임에 참가하셨습니다.`,
          }),
        });
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers.message}`);
        console.log(`Additional details: ${frame.body}`);
      },
    });
    client.current.activate();
  };

  // input value 즉 메시지 채팅을 입력
  function publish(value) {
    if (message === '') {
      alert('채팅 내용을 입력해주세요.');
      return;
    }

    client.current.publish({
      destination: `/sub/gameroom/${param.roomId}`,
      body: JSON.stringify({
        type: 'CHAT',
        roomId: param.roomId,
        sender: nickname,
        message: value,
      }),
    });
    setMessage('');
  }

  useEffect(() => {
    connect(); // 연결된 경우 렌더링
  }, []);

  console.log('chatData', chatData);
  console.log('chatData.message', chatData.message);
  // console.log('chatData.type', chatData.type);
  console.log('chatMessages', chatMessages);

  return (
    <StChatBox>
      <StNotice>공지내용</StNotice>
      <StUserChatBox>
        {chatData.sender && (
          <div>
            {chatMessages?.map((message, index) => {
              if (chatData.sender === nickname) {
                return (
                  <MyChat
                    // eslint-disable-next-line react/no-array-index-key
                    key={String(index)}
                  >{`${chatUser[index]}: ${message}`}</MyChat>
                );
              }
              return (
                <AnotherChat
                  // eslint-disable-next-line react/no-array-index-key
                  key={String(index)}
                >{`${chatUser[index]}: ${message}`}</AnotherChat>
              );

              // return (ㄷㄷㄷ
              //   <Chat
              //     // eslint-disable-next-line react/no-array-index-key
              //     key={String(index)}
              //     classname={chatData.sender === nickname ? 'my' : ''}
              //   >
              //     <div>{`${chatUser[index]}: ${message}`}</div>
              //   </Chat>
              // );
            })}
          </div>
        )}
      </StUserChatBox>
      <StSendChat>
        <input
          type="text"
          placeholder="채팅을 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => publish(message)}>전송</button>
      </StSendChat>
    </StChatBox>
  );
}

const StChatBox = styled.div`
  border: 2px solid black;
  display: grid;
  grid-template-rows: 50px 1fr 50px;
`;
const StNotice = styled.div`
  border: 1px solid black;
`;
const StUserChatBox = styled.div`
  border: 1px solid black;
`;
const StSendChat = styled.div`
  border: 1px solid black;
  height: 50px;
`;

const Chat = styled.div`
  /* color: purple; */

  &.my {
    font-size: 30px;
    color: blue;
  }
`;

// const Chats = styled.div`
//   color: purple;

//   li {
//     list-style: none;
//   }
// `;

const MyChat = styled.div`
  background-color: aliceblue;
  text-align: right;
  color: blue;
`;

const AnotherChat = styled.div`
  text-align: left;
  color: red;
`;

export default ChatBox;
