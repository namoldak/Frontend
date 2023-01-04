// 외부 모듈
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 내부 모듈
import GameRoom from '../pages/GameRoom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
<<<<<<< HEAD
import RoomListTest from '../pages/RoomListTest';
=======
import RoomList from '../pages/RoomList';
>>>>>>> 97d1ea306d8aa426b47be13025c7bca0574d5456

function Router() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/gameroom/:roomName" element={<GameRoom />} />
=======
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/gameroom" element={<GameRoom />} />
>>>>>>> 97d1ea306d8aa426b47be13025c7bca0574d5456
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/roomlist" element={<RoomListTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
