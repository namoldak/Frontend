// 외부 모듈
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// 내부 모듈
import rooms from '../modules/roomSlice';

const rootReducer = combineReducers({
  rooms: rooms,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
