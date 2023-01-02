// 외부 모듈
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 내부 모듈
import GameRoom from "../pages/GameRoom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gameroom" element={<GameRoom />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
