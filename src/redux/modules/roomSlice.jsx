import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  rooms: [],
  error: null,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (newRoom, thunkAPI) => {
    try {
      const response = await instance.post(`/rooms`, newRoom);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const enterRoom = createAsyncThunk(
  'room/enterRoom',
  async (roomInfo, thunkAPI) => {
    try {
      const response = await instance.post(`/rooms/${roomInfo.id}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

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
      return thunkAPI.fulfillWithValue(response.data.gameRoomResponseDtoList);
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
    [createRoom.fulfilled]: (state, action) => {
      sessionStorage.setItem('owner', action.payload.owner);
      sessionStorage.setItem('normalEnter', true);
      state.rooms.gameRoomResponseDtoList.push(action.payload);
      window.location.href = `/gameroom/${action.payload.roomId}`;
    },
    [createRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [enterRoom.fulfilled]: (state, action) => {
      sessionStorage.setItem('owner', action.payload.owner);
      sessionStorage.setItem('normalEnter', true);
      state.rooms = action.payload;
      window.location.href = `/gameroom/${action.payload.roomId}`;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [searchRoom.fulfilled]: (state, action) => {
      state.rooms.gameRoomResponseDtoList = action.payload;
    },
    [searchRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
