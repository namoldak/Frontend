// 외부 모듈
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 내부 모듈
import Layout from 'components/common/Layout/Layout';
import RoomListLayout from 'components/common/Layout/RoomListLayout';
import GameRoom from 'pages/GameRoom';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import RoomList from 'pages/RoomList';
import Community from 'pages/CommunityPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RoomListLayout />}>
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/community" element={<Community />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/gameroom/:roomId" element={<GameRoom />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
