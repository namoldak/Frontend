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

export const readAllRooms = createAsyncThunk(
  'room/readAllRooms',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/rooms`);
      console.log('read rooms:', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('read rooms error:', error);
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
    [createRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
