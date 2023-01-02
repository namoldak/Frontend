import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rooms: [],
  error: null,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (newRoom, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3001/rooms`, newRoom);
      console.log('create room:', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('create room error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [createRoom.fulfilled]: (state, action) => {
      state.room.push(action.payload);
    },
  },
});

export default roomSlice.reducer;
