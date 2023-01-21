import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useToast from 'hooks/useToast';
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
      // console.log('roomId', response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      if (error.response.status === 403) {
        useToast('로그인이 안되어있닭! 로그인을 하고와야한닭!', 'error');
        window.location.href = `/login`;
      } else {
        // console.log('create room error:', error);
        useToast('지금은 만들 수 없닭... 다시 시도해야한닭', 'error');
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const enterRoom = createAsyncThunk(
  'room/enterRoom',
  async (roomInfo, thunkAPI) => {
    // console.log('roomInfo', roomInfo);
    try {
      const response = await instance.post(`/rooms/${roomInfo.id}`);
      // console.log('enterroom respose', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      // console.log(error);
      if (error.response.status === 403) {
        useToast('로그인이 안되어있닭! 로그인을 하고와야한닭!', 'error');
        window.location.href = `/login`;
      } else {
        useToast('마음의 준비가 안됐닭! 다시 입장 시도를 해야겠닭!', 'error');
        window.location.href = `/rooms`;
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const readAllRooms = createAsyncThunk(
  'room/readAllRooms',
  async (payload, thunkAPI) => {
    // console.log('payload', payload);
    try {
      const response = await instance.get(
        `/rooms?page=${payload.page}&size=${payload.limit}`,
      );
      // console.log('read rooms:', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      // console.log('read rooms error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const searchRoom = createAsyncThunk(
  'room/searchRoom',
  async (keyword, thunkAPI) => {
    console.log('keyword', keyword);
    try {
      const response = await instance.get(`/rooms/search?keyword=${keyword}`);
      // console.log('search room', response);
      return thunkAPI.fulfillWithValue(response.data.gameRoomResponseDtoList);
    } catch (error) {
      // console.log('search room error', error);
      useToast(`${error.response.data.statusMsg}`, 'warning');
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
      // console.log('action payload', action.payload);
      sessionStorage.setItem('owner', action.payload.owner);
      state.rooms.gameRoomResponseDtoList.push(action.payload);
      // 세션스토리지에 오너저장
      window.location.href = `/gameroom/${action.payload.roomId}`;
    },
    [createRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [enterRoom.fulfilled]: (state, action) => {
      // console.log(action.payload);
      sessionStorage.setItem('owner', action.payload.data.owner);
      state.rooms = action.payload;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      // console.log('action payload readAllRooms', action.payload);
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [searchRoom.fulfilled]: (state, action) => {
      // console.log('action payload searchRoom', action);
      state.rooms.gameRoomResponseDtoList = action.payload;
    },
    [searchRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default roomSlice.reducer;
