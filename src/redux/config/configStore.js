// 외부 모듈
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorToastMsg from 'redux/modules/errorToastMsg';

// 내부 모듈
import posts from 'redux/modules/postSlice';
import rooms from '../modules/roomSlice';
import comments from '../modules/commentSlice';

const rootReducer = combineReducers({
  rooms,
  posts,
  // comments,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(errorToastMsg),
});

export default store;
