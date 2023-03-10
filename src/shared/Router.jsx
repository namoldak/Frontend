// 외부 모듈
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// 내부 모듈
import Layout from 'components/common/Layout/Layout';
import PostLayout from 'components/common/Layout/PostLayout';
import RoomListLayout from 'components/common/Layout/RoomListLayout';
import GameRoomPage from 'pages/GameRoomPage';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import RoomListPage from 'pages/RoomListPage';
import CommunityPage from 'pages/CommunityPage';
import WritePostPage from 'pages/WritePostPage';
import PostPage from 'pages/PostPage';
import ModifyPostPage from 'pages/ModifyPostPage';
import CommunityLayout from 'components/common/Layout/CommunityLayout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gameroom" element={<Navigate to="/rooms" replace />} />
        <Route path="/posts" element={<Navigate to="/rooms" replace />} />
        <Route element={<RoomListLayout />}>
          <Route path="/rooms" element={<RoomListPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gameroom/:roomId" element={<GameRoomPage />} />
        </Route>
        <Route element={<CommunityLayout />}>
          <Route path="/posts/all" element={<CommunityPage />} />
        </Route>
        <Route element={<PostLayout />}>
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/write" element={<WritePostPage />} />
          <Route path="/posts/modify/:id" element={<ModifyPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
