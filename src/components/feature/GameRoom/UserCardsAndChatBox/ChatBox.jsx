
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
  // const allMessages = [];
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  const subscribe = async () => {
    client.current.subscribe(`/sub/gameroom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      // console.log('subscribe data', data);
      console.log('1');
      switch (data.type) {
        case 'ENTER': {
          console.log('2');
          // console.log('enter');
          break;
        }
        case 'CHAT': {
          // console.log('chat', data.sender)
          console.log('3');
          setChatMessages((chatMessages) => [...chatMessages, data]);
          // setChatMessages([...chatMessages, data.message]);
          console.log('4');
          // setChatUser([...chatUser, data.sender]);
          setChatUser((chatUser) => [...chatUser, data.sender]);
          console.log('5');
          console.log('chatMessages', chatMessages);
          console.log('data.message', data.message);
          break;
        }
        default: {
          // console.log('default');
          console.log('6');
          break;
        }
      }
    });
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

  return (
    <StChatBox>
      <StNotice>공지내용</StNotice>
      <StUserChatBox>
        <div>
          {chatMessages?.map((message, index) => {
            return (
              <Chat
                // eslint-disable-next-line react/no-array-index-key
                key={String(index)}
                className={message.sender === nickname ? 'my' : 'other'}
              >
                <div>{`${message.sender}: ${message.message}`}</div>
              </Chat>
            );
          })}
        </div>
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
  &.my {
    text-align: right;
    color: blue;
  }

  &.other {
    color: purple;
    text-align: left;
  }
`;

// const Chats = styled.div`
//   color: purple;

//   li {
//     list-style: none;
//   }
// `;

const MyChat = styled.div`
  text-align: right;
  color: blue;
`;

const AnotherChat = styled.div`
  text-align: left;
  color: red;
`;

export default ChatBox;
=======
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
  // const allMessages = [];
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  const subscribe = async () => {
    client.current.subscribe(`/sub/gameroom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      // console.log('subscribe data', data);
      console.log('1');
      switch (data.type) {
        case 'ENTER': {
          console.log('2');
          // console.log('enter');
          break;
        }
        case 'CHAT': {
          // console.log('chat', data.sender)
          console.log('3');
          setChatMessages((chatMessages) => [...chatMessages, data]);
          // setChatMessages([...chatMessages, data.message]);
          console.log('4');
          // setChatUser([...chatUser, data.sender]);
          setChatUser((chatUser) => [...chatUser, data.sender]);
          console.log('5');
          console.log('chatMessages', chatMessages);
          console.log('data.message', data.message);
          break;
        }
        default: {
          // console.log('default');
          console.log('6');
          break;
        }
      }
    });
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

  return (
    <StChatBox>
      <StNotice>공지내용</StNotice>
      <StUserChatBox>
        <div>
          {chatMessages?.map((message, index) => {
            return (
              <Chat
                // eslint-disable-next-line react/no-array-index-key
                key={String(index)}
                className={message.sender === nickname ? 'my' : 'other'}
              >
                <div>{`${message.sender}: ${message.message}`}</div>
              </Chat>
            );
          })}
        </div>
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
  &.my {
    text-align: right;
    color: blue;
  }

  &.other {
    color: purple;
    text-align: left;
  }
`;

// const Chats = styled.div`
//   color: purple;

//   li {
//     list-style: none;
//   }
// `;

const MyChat = styled.div`
  text-align: right;
  color: blue;
`;

const AnotherChat = styled.div`
  text-align: left;
  color: red;
`;

export default ChatBox;

