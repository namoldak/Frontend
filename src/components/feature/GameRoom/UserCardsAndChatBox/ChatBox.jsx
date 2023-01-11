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
  const allMessages = [];
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };

  const subscribe = () => {
    client.current.subscribe(
      `/sub/gameroom/${param.roomId}`,
      async ({ body }) => {
        const data = JSON.parse(body);
        console.log('subscribe data', data);
        switch (data.type) {
          case 'ENTER': {
            console.log('enter');
            break;
          }
          case 'CHAT': {
            console.log('chat', data.sender);
            setChatMessages([...chatMessages, data.message]);
            break;
          }
          default: {
            console.log('default');
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

  function publish(value) {
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
    connect();
  }, []);
  return (
    <StChatBox>
      <StNotice>공지내용</StNotice>
      <StUserChatBox>
        <div>
          {chatMessages?.map((message) => {
            return <li>{message}</li>;
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

export default ChatBox;
