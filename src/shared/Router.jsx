import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameRoom from "../pages/GameRoom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gameroom" element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;