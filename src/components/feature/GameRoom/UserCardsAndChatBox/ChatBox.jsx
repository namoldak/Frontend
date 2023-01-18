import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { useCookies } from 'react-cookie';
import { getNicknameCookie } from '../../../../utils/cookies';
// 내부 모듈
import chatBack from '../../../../assets/images/chatBack.svg';
import chatBack2 from '../../../../assets/images/chatBack2.svg';
import chatEnterBtn from '../../../../assets/images/chatEnterBtn.svg';
import chatNotice from '../../../../assets/images/chatNotice.svg';

function ChatBox({ notice }) {
  const client = useRef({});
  const param = useParams();
  const [cookie] = useCookies();
  const nickname = getNicknameCookie('nickname');
  const [message, setMessage] = useState(''); // input value 값
  const [chatMessages, setChatMessages] = useState([]); // 누적 채팅 메시지들
  const [chatUser, setChatUser] = useState([]); // 누적 유저 이름들
  const input = useRef(null);
  const connectHeaders = {
    Authorization: cookie.access_token,
    'Refresh-Token': cookie.refresh_token,
  };
  console.log(notice);
  const subscribe = async () => {
    client.current.subscribe(`/sub/gameroom/${param.roomId}`, ({ body }) => {
      const data = JSON.parse(body);
      console.log('subscribe data', data);
      switch (data.type) {
        case 'ENTER': {
          // console.log('enter');
          break;
        }
        case 'CHAT': {
          // console.log('chat', data.sender)
          setChatMessages((chatMessages) => [...chatMessages, data]);
          setChatUser((chatUser) => [...chatUser, data.sender]);
          // setChatMessages([...chatMessages, data.message]);
          // setChatUser([...chatUser, data.sender]);
          break;
        }
        default: {
          // console.log('default');
          break;
        }
      }
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs('https://api.namoldak.com/ws-stomp'),
      // webSocketFactory: () => new SockJs('http://13.209.84.31:8080/ws-stomp'),
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
    if (message.trim() === '') {
      // alert('채팅 내용을 입력해주세요.');
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
    connect();
  }, []);

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      document.activeElement.blur();
      publish(message);
      input.current.focus();
    }
  }

  return (
    <StChatBox>
      <StChatBoxCon>
        <StNoticeBack>
          <StNoticeText>{notice}</StNoticeText>
        </StNoticeBack>
        {/* <StNotice>공지사항</StNotice> */}
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
        <StSendChat onKeyUp={onKeyUpEnter}>
          <input
            type="text"
            placeholder="채팅을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={onKeyUpEnter}
          />
          <StChatEnter onClick={() => publish(message)}>
            <img src={chatEnterBtn} alt="입력" />
          </StChatEnter>
        </StSendChat>
      </StChatBoxCon>
    </StChatBox>
  );
}

const StChatBox = styled.div`
  position: relative;
  width: 540px;
  height: 780px;
  background-image: url(${chatBack});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StChatBoxCon = styled.div`
  position: absolute;
  top: 4%;
  left: 6%;
  width: 480px;
  height: 700px;
  background-image: url(${chatBack2});
  background-size: contain;
  background-repeat: no-repeat;
  padding: 20px 18px 20px 18px;
  border: 1px solid black;
`;

const StNoticeBack = styled.div`
  background-image: url(${chatNotice});
  background-size: cover;
  background-repeat: no-repeat;
  width: 446px;
  height: 62px;
`;

const StNoticeText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  line-height: 60px;
  text-align: center;

  span {
    color: #cc0202;
  }
`;

const StUserChatBox = styled.div`
  margin: 20px auto;
  max-height: 500px;
  border: 1px solid black;
`;

const Chat = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 0 4px 0;

  &.my {
    text-align: right;
  }

  &.other {
    text-align: left;
  }
`;

const StSendChat = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 645px;
  left: 0;

  input {
    width: 374px;
    height: 70px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 7px solid ${({ theme }) => theme.colors.brown};
    border-radius: 10px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    text-indent: 16px;
    line-height: 22px;
    margin-right: 20px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const StChatEnter = styled.button`
  width: 96px;
  height: 74px;
`;

export default ChatBox;
