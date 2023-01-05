import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api/core/axios';

const initialState = {
  rooms: [],
  error: null,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (newRoom, thunkAPI) => {
    try {
      const response = await instance.post(`/rooms`, newRoom);
      console.log('create room:', response);
      return thunkAPI.fulfillWithValue(response.data.body.data);
    } catch (error) {
      console.log('create room error:', error);
      alert('방 생성에 실패했습니다.');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const enterRoom = createAsyncThunk(
  'room/enterRoom',
  async (roomInfo, thunkAPI) => {
    console.log('roomInfo', roomInfo);
    try {
      const response = await instance.post(`/rooms/${roomInfo.id}`);
      console.log('enterroom respose', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      alert('마음의 준비가 안됐닭! 다시 입장 시도를 해야겠닭!');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const readAllRooms = createAsyncThunk(
  'room/readAllRooms',
  async (payload, thunkAPI) => {
    console.log('payload', payload);
    try {
      const response = await instance.get(
        `/rooms?page=${payload.page}&size=${payload.limit}`,
      );
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
      state.rooms.push(action.payload);
      window.location.href = `/gameroom/${action.payload.roomId}`;
    },
    [createRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [enterRoom.fulfilled]: (state, action) => {
      console.log('enter state', state);
      console.log('enter action', action);
      console.log('enterRoom payload', action.payload);
      state.rooms = action.payload;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      // console.log('action payload readAllRooms', action.payload);
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
