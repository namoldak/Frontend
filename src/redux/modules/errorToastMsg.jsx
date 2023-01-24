import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import useToast from 'hooks/useToast';

const errorToastMsg = (MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.response.data.message) {
      useToast(`${action.payload.response.data.message}`, 'error');
      window.location.href = '/login';
    } else if (action.payload.response.data.statusMsg) {
      useToast(`${action.payload.response.data.statusMsg}`, 'error');
    }
  }
  return next(action);
};

export default errorToastMsg;
