import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  volume: 0.1,
};

const soundSlice = createSlice({
  name: 'bgmVolume',
  initialState,
  reducers: {
    setVolume: (_, action) => ({
      volume: action.payload,
    }),
  },
});

export const { setVolume } = soundSlice.actions;
export default soundSlice.reducer;
