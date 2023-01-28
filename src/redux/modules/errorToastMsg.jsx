import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import useToast from 'hooks/useToast';

const errorToastMsg = (MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('action', action);
    if (action.payload.response.data.status === 400) {
      useToast(`오류가 발생했습니다. 다시 시도해주세요.`, 'error');
      // window.history.back();
    } else if (action.payload.response.data.statusMsg) {
      useToast(`${action.payload.response.data.statusMsg}`, 'error');
    }
  }
  return next(action);
};

export default errorToastMsg;
