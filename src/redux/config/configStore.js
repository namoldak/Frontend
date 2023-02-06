// 외부 모듈
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorToastMsg from 'redux/errorToastMsg';

// 내부 모듈
import posts from 'redux/postSlice';
import rooms from '../roomSlice';

const rootReducer = combineReducers({
  rooms,
  posts,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(errorToastMsg),
});

export default store;
