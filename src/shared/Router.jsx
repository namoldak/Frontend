// 외부 모듈
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 내부 모듈
import GameRoom from '../pages/GameRoom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import RoomList from '../pages/RoomList';
import Layout from '../components/common/Layout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gameroom/:roomId" element={<GameRoom />} />
        {/* <Route element={<Layout />}> */}
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
