/* eslint-disable func-names */
import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import useToast from 'hooks/useToast';

const errorToastMsg = (MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.response.data.status === 400) {
      useToast(`오류가 발생했습니다. 다시 시도해주세요.`, 'error');
    } else if (action.payload.response.data.status === 403) {
      useToast(`로그인이 필요합니다.`, 'error');
      setTimeout(function () {
        window.location.href = '/login';
      }, 2000);
    } else if (action.payload.response.status === 404) {
      useToast(`${action.payload.response.data.statusMsg}`, 'error');
    } else if (action.payload.response.data.statusCode === '400') {
      useToast(`${action.payload.response.data.statusMsg}`, 'error');
      setTimeout(function () {
        window.location.href = '/login';
      }, 2000);
    } else if (action.payload.response.data.statusCode !== '400') {
      useToast(`${action.payload.response.data.statusMsg}`, 'error');
    }
  }
  return next(action);
};

export default errorToastMsg;
