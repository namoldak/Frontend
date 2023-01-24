// 외부 모듈
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorToastMsg from 'redux/modules/errorToastMsg';

// 내부 모듈
import rooms from '../modules/roomSlice';

const rootReducer = combineReducers({
  rooms,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(errorToastMsg),
});

export default store;
