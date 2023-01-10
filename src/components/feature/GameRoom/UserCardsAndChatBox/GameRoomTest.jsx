// 외부모듈
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

// 내부모듈
import { instance } from '../../../../api/core/axios';

function GameRoomText() {
  const [socket, setSocket] = null;
  const [users, setUsers] = useState < Array < IWebRTCUser >> [];
  let localVideoRef = useRef < HTMLVideoElement > null;
  let pcs;
  let newSocket = io.connect('http://localhost:8080');
  let localStream;
  const pc_config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  newSocket.on('all_users', (allUsers) => {
    let len = allUsers.length;

    for (let i = 0; i < len; i++) {
      createPeerConnection(
        allUsers[i].id,
        allUsers[i].email,
        newSocket,
        localStream,
      );
      let pc = pcs[allUsers[i].id];
      if (pc) {
        pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
          .then((sdp) => {
            console.log('create offer success');
            pc.setLocalDescription(new RTCSessionDescription(sdp));
            newSocket.emit('offer', {
              sdp: sdp,
              offerSendID: newSocket.id,
              offerSendEmail: 'offerSendSample@sample.com',
              offerReceiveID: allUsers[i].id,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  });

  newSocket.on('getOffer', (data) => {
    console.log('get offer');
    createPeerConnection(
      data.offerSendID,
      data.offerSendEmail,
      newSocket,
      localStream,
    );
    let pc = pcs[data.offerSendID];
    if (pc) {
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
        console.log('answer set remote description success');
        pc.createAnswer({
          offerToReceiveVideo: true,
          offerToReceiveAudio: true,
        })
          .then((sdp) => {
            console.log('create answer success');
            pc.setLocalDescription(new RTCSessionDescription(sdp));
            newSocket.emit('answer', {
              sdp: sdp,
              answerSendID: newSocket.id,
              answerReceiveID: data.offerSendID,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  });

  newSocket.on('getAnswer', (data) => {
    console.log('get answer');
    let pc = pcs[data.answerSendID];
    if (pc) {
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    }
    //console.log(sdp);
  });

  newSocket.on('getCandidate', (data) => {
    console.log('get candidate');
    let pc = pcs[data.candidateSendID];
    if (pc) {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(() => {
        console.log('candidate add success');
      });
    }
  });

  newSocket.on('user_exit', (data) => {
    pcs[data.id].close();
    delete pcs[data.id];
    setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
  });

  setSocket(newSocket);
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        width: 240,
        height: 240,
      },
    })
    .then((stream) => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      localStream = stream;

      newSocket.emit('join_room', { room: '1234', email: 'sample@naver.com' });
    })
    .catch((error) => {
      console.log(`getUserMedia error: ${error}`);
    });
  const createPeerConnection = (socketID, email, newSocket, localStream) => {
    let pc = new RTCPeerConnection(pc_config);

    // add pc to peerConnections object
    pcs = { ...pcs, [socketID]: pc };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('onicecandidate');
        newSocket.emit('candidate', {
          candidate: e.candidate,
          candidateSendID: newSocket.id,
          candidateReceiveID: socketID,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    pc.ontrack = (e) => {
      console.log('ontrack success');
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          email: email,
          stream: e.streams[0],
        },
      ]);
    };

    if (localStream) {
      console.log('localstream add');
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    } else {
      console.log('no local stream');
    }

    // return pc
    return pc;
  };
  interface IWebRTCUser {
    id: string;
    email: string;
    stream: MediaStream;
  }

  interface Props {
    email: string;
    stream: MediaStream;
    muted?: boolean;
  }

  const Video = ({ email, stream, muted }: Props) => {
    const ref = useRef < HTMLVideoElement > null;
    const [isMuted, setIsMuted] = useState < boolean > false;

    useEffect(() => {
      if (ref.current) ref.current.srcObject = stream;
      if (muted) setIsMuted(muted);
    });

    return (
      <Container>
        <VideoContainer ref={ref} muted={isMuted} autoPlay></VideoContainer>
        <UserLabel>{email}</UserLabel>
      </Container>
    );
  };

  return (
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: 'black',
        }}
        muted
        ref={localVideoRef}
        autoPlay
      ></video>
      {users.map((user, index) => {
        return <Video key={index} email={user.email} stream={user.stream} />;
      })}
    </div>
  );
}

export default GameRoomText;
