/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// 내부 모듈
import chatBack from 'assets/images/chatBack.svg';
import chatBack2 from 'assets/images/chatBack2.svg';
import chatEnterBtn from 'assets/images/chatEnterBtn.svg';
import chatNotice from 'assets/images/chatNotice.svg';
import { getNicknameCookie } from 'utils/cookies';

function ChatBox({ notice, sendChat, chatMessages }) {
  const nickname = getNicknameCookie('nickname');
  const [message, setMessage] = useState('');
  const input = useRef(null);
  const scrollRef = useRef();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  function publish(value) {
    sendChat(value);
    setMessage('');
  }

  function onKeyUpEnter(event) {
    if (event.key === 'Enter') {
      publish({ message, sender: nickname });
    }
  }

  return (
    <StChatBox>
      <StChatBoxCon>
        <StNoticeBack>
          <StNoticeText>{notice}</StNoticeText>
        </StNoticeBack>
        <StUserChatBox ref={scrollRef}>
          <div>
            {chatMessages?.map((message, index) => {
              return (
                <Chat
                  // eslint-disable-next-line react/no-array-index-key
                  key={String(index)}
                  className={
                    message.sender === nickname
                      ? 'my'
                      : message.sender === '양계장 주인'
                      ? 'chickenLord'
                      : 'other'
                  }
                >
                  <div>{`${message.sender}`}</div>
                  <StChatBubble
                    className={
                      message.sender === nickname
                        ? 'my'
                        : message.sender === '양계장 주인'
                        ? 'chickenLord'
                        : 'other'
                    }
                  >{`${message.message}`}</StChatBubble>
                </Chat>
              );
            })}
          </div>
        </StUserChatBox>
        <StSendChat>
          <input
            ref={input}
            type="text"
            placeholder="채팅을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={onKeyUpEnter}
          />
          <StChatEnter onClick={() => publish({ message, sender: nickname })}>
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
`;

const StNoticeBack = styled.div`
  background-image: url(${chatNotice});
  background-size: cover;
  background-repeat: no-repeat;
  width: 446px;
  height: 62px;
`;

const StNoticeText = styled.span`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0.08em;
  text-align: center;
  padding-top: 22px;

  span {
    color: #cc0202;
  }
`;

const StUserChatBox = styled.div`
  margin: 20px auto;
  overflow: auto;
  max-height: 500px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #f5c86f;
  }
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};

  &.my {
    text-align: right;
    align-items: flex-end;
  }

  &.other {
    text-align: left;
    justify-content: flex-start;
  }

  &.chickenLord {
    text-align: left;
    justify-content: flex-start;
    color: rgb(205, 21, 22);
  }
`;

const StChatBubble = styled.div`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 8px;

  &.chickenLord {
    border: 1px solid rgb(205, 21, 22);
    padding: 8px;
  }
`;

const StSendChat = styled.div`
  width: 100%;
  ${({ theme }) => theme.common.flexBetween}
  position: absolute;
  top: 645px;
  left: 0;

  input {
    width: 374px;
    height: 76px;
    background: ${({ theme }) => theme.colors.lightBeige};
    border: 4px solid ${({ theme }) => theme.colors.yellowBrown};
    outline: 4px solid ${({ theme }) => theme.colors.brown};
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    line-height: 21px;
    text-indent: 16px;
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
