import { useEffect, useRef } from 'react';tream
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import * as SockJS from 'sockjs-client';
import Audio from './Audio';
let pcs: any;
let localStream: MediaStream;
function AudioCall() {
  const socketRef = useRef<WebSocket>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [users, setUsers] = useState<Array<any>>([]);
  const { roomName } = useParams();
  const createPeerConnection = (
    socketID: string,
    socket: any,
    peerConnectionLocalStream: MediaStream,
  ): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });
    // add pc to peerConnections object
    console.log(socketID);
    pcs = { ...pcs, [socketID]: pc };
    console.log(pcs);
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('onicecandidate');
        socket.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate,
            receiver: socketID,
          }),
        );
      }
    };
    pc.oniceconnectionstatechange = (e) => {
      // console.log(e);
    };
    pc.ontrack = (e) => {
      console.log('ontrack success');
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
      setUsers((oldUsers) => [
        ...oldUsers,
        {
          id: socketID,
          stream: e.streams[0],
        },
      ]);
    };
    if (peerConnectionLocalStream) {
      console.log('localstream add');
      peerConnectionLocalStream.getTracks().forEach((track) => {
        pc.addTrack(track, peerConnectionLocalStream);
      });
    } else {
      console.log('no local stream');
    }
    return pc;
  };
  useEffect(() => {
    socketRef.current = new SockJS(`${process.env.REACT_APP_API_URL}signal`);
    socketRef.current.onopen = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then((stream) => {
          if (audioRef.current) audioRef.current.srcObject = stream;
          localStream = stream;
          socketRef.current?.send(JSON.stringify({ type: 'join_room', room: roomName }));
        })
        .catch((error) => {
          console.log(`getUserMedia error: ${error}`);
        });
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'all_users': {
          const { allUsers } = data;
          console.log(allUsers);
          const len = allUsers.length;
          console.log(len);
          for (let i = 0; i < len; i += 1) {
            console.log('all_users');
            createPeerConnection(allUsers[i].id, socketRef.current, localStream);
            const allUsersPc: RTCPeerConnection = pcs[allUsers[i].id];
            console.log(allUsersPc);
            if (allUsersPc) {
              allUsersPc
                .createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false })
                .then((offer) => {
                  console.log('create offer success');
                  allUsersPc.setLocalDescription(new RTCSessionDescription(sdp));
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'offer',
                      offer,
                      receiver: allUsers[i].id,
                    }),
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
          break;
        }
        case 'offer': {
          console.log('get offer');
          createPeerConnection(data.sender, socketRef.current, localStream);
          const offerPc: RTCPeerConnection = pcs[data.sender];
          if (offerPc) {
            offerPc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
              console.log('answer set remote description success');
              offerPc
                .createAnswer({ offerToReceiveVideo: false, offerToReceiveAudio: true })
                .then((sdp) => {
                  console.log('create answer success');
                  offerPc.setLocalDescription(new RTCSessionDescription(sdp));
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'answer',
                      sdp,
                      // answerSendID: newSocket.id,
                      receiver: data.sender,
                    }),
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
          break;
        }
        case 'answer': {
          console.log('get answer');
          console.log(pcs, data);
          const answerPc: RTCPeerConnection = pcs[data.sender];
          console.log(answerPc.signalingState);
          if (answerPc) {
            console.log(answerPc);
            answerPc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          }
          break;
        }
        case 'candidate': {
          console.log('get candidate');
          const candidatePc: RTCPeerConnection = pcs[data.sender];
          console.log(candidatePc.signalingState);
          if (candidatePc) {
            candidatePc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(() => {
              console.log('candidate add success');
              console.log(data.candidate, pcs);
            });
          }
          break;
        }
        case 'user_exit': {
          console.log('delete', data.sender);
          pcs[data.sender].close();
          delete pcs[data.sender];
          setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.sender));
          break;
        }
        default:
          break;
      }
    };
    socketRef.current.onerror = (event) => {
      console.log(`Error! : ${event}`);
    };
    return () => {
      if (socketRef.current) {
        console.log('close');
        socketRef.current.close();
      }
    };
  }, []);
  return (
    <div>
      <audio ref={audioRef} autoPlay>
        <track kind="captions" />
      </audio>
      {users.map((user) => {
        return <Audio key={user.id} stream={user.stream} />;
      })}
    </div>
  );
}
export default AudioCall;