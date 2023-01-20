// import logo from './logo.svg';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Router from './shared/Router';

function App() {
  return (
    <>
      <Router />
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
