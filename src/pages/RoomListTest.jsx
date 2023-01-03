// 외부모듈
import { useRef, React, useState } from 'react';
import { Link } from 'react-router-dom';

function RoomListTest() {
  const welcome = useRef(null);
  const [roomName, setRoomName] = useState('');

  return (
    <div>
      <span>RoomListTest</span>
      <div ref={welcome}>
        <form>
          <input
            placeholder="roomname"
            required
            type="text"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
          <Link to={`/gameroom/${roomName}`}>
            <button>enterRoom</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RoomListTest;
