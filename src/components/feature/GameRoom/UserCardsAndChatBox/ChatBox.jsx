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
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatData, setChatData] = useState([]); // chat 전체 데이터
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
        setChatData(data);
        console.log('subscribe data', chatData);
        switch (data.type) {
          case 'ENTER': {
            // console.log('enter');
            break;
          }
          case 'CHAT': {
            // console.log('chat', data.sender);
            setChatMessages((chatMessages) => [...chatMessages, data.message]);
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
        {`채팅 내역들 : ${chatMessages}`}
        {chatData.sender && (
          <div>
            {chatMessages?.map((message) => {
              // 채팅 내역들
              // if (chatData.type === 'CHAT') {
              //   return (
              //     <Chats key={message}>{`채팅들 : ${chatMessages}`}</Chats>
              //   );
              // }
              // 내가 채팅 보내는 경우
              if (chatData.sender === nickname) {
                return (
                  <MyChat
                    key={nickname}
                  >{`${chatData.sender}: ${chatData.message}`}</MyChat>
                );
              }
              // 다른 사람이 채팅 보내는 경우
              return (
                <AnotherChat
                  key={nickname}
                >{`${chatData.sender}: ${chatData.message}`}</AnotherChat>
              );
            })}
          </div>
        )}
        {/* {chatData.sender === '' && (
          <div>
            {chatMessages?.map((message) => {
              return <Chats key={message}>{`채팅들 : ${chatMessages}`}</Chats>;
            })}
          </div>
        )} */}
        {/* // 채팅 내역들
        if (chatData.type === 'CHAT') {
          return (
            <Chats key={message}>{`채팅들 : ${chatMessages}`}</Chats>
          );
        } */}
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

const Chats = styled.div`
  color: purple;
`;

const MyChat = styled.div`
  color: blue;
`;

const AnotherChat = styled.div`
  color: red;
`;

export default ChatBox;
