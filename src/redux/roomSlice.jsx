import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  rooms: [],
  error: null,
};

export const readAllRooms = createAsyncThunk(
  'room/readAllRooms',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/rooms?page=${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const searchRoom = createAsyncThunk(
  'room/searchRoom',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/rooms/search?page=${payload.page}&keyword=${payload.keyword}`,
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [readAllRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [searchRoom.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [searchRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
