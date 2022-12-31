import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 테스트용 파일입니다 주석문 지우시고 사용하세요 */}
        {/* <Route path="/main" element={<MainPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;