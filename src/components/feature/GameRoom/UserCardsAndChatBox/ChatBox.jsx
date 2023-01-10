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
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  console.log('param.roomId', param.roomId);
  console.log('nickname', nickname);
  console.log('input', input);
  console.log('chatMessage', chatMessages);

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/rooms/${param.roomId}`, ({ body }) => {
      setChatMessages((newMessage) => [...newMessage, JSON.parse(body)]);
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(`http://13.209.84.31:8080/ws-stomp`), // proxy를 통한 접속
      // webSocketFactory: () =>
      //   new SockJs(`${process.env.REACT_APP_API_URL}/ws-stomp`), // proxy를 통한 접속
      connectHeaders: {
        Authorization: cookie.access_token,
        'Refresh-Token': cookie.refresh_token,
      },
      debug(str) {
        // console.log('chat str', str);
      },
      onConnect: () => {
        subscribe();
        if (nickname) {
          client.current.publish({
            destination: '/pub/chat/messages',
            body: JSON.stringify({
              type: 'ENTER',
              roomId: param.roomId,
              sender: nickname,
              message: `${nickname}님이 게임에 참가하셨습니다.`,
            }),
          });
        }
      },
      onStompError: (frame) => {
        // console.log('chat frame', frame);
      },
    });
    client.current.activate();
  };

  const publish = (input) => {
    if (!client.current.connected) {
      return;
    }
    if (input === '') {
      alert('채팅 내용을 입력해주세요.');
      return;
    }
    client.current.publish({
      destination: '/pub/chat/messages',
      body: JSON.stringify({
        type: 'CHAT',
        roomId: param.roomId,
        sender: nickname,
        message: input,
      }),
    });
    setInput('');
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <StChatBox>
      <StNotice>공지내용</StNotice>
      <StUserChatBox>
        {chatMessages && chatMessages.length > 0 && (
          <div>
            {chatMessages?.map((newMessage) => {
              if (newMessage.type === 'ENTER') {
                return (
                  <div
                    // key={index}
                    className="anotherChatMessage"
                  >{`${newMessage.message}`}</div>
                );
              }
              if (newMessage.sender === nickname) {
                return (
                  <div
                    // key={index}
                    className="myChatMessage"
                  >{`${newMessage.sender}: ${newMessage.message}`}</div>
                );
              }
              return (
                <div
                  //   key={index}
                  className="anotherChatMessage"
                >{`${newMessage.sender}: ${newMessage.message}`}</div>
              );
            })}
          </div>
        )}
      </StUserChatBox>
      <StSendChat>
        <input
          type="text"
          placeholder="채팅을 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && publish(input)}
        />
        <button onClick={() => publish(input)}>전송</button>
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
