import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api/core/axios';

const initialState = {
  totalPage: 0,
  gameRoomResponseDtoList: [],
  error: null,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (newRoom, thunkAPI) => {
    try {
      const response = await instance.post(`/rooms`, newRoom);
      // console.log('create room:', response);
      // console.log('roomId', response.data.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      if (error.response.status === 403) {
        alert('로그인이 안되어있닭! 로그인을 하고와야한닭!');
        window.location.href = `/login`;
      } else {
        // console.log('create room error:', error);
        alert('지금은 만들 수 없닭... 다시 시도해야한닭');
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
        alert('로그인이 안되어있닭! 로그인을 하고와야한닭!');
        window.location.href = `/login`;
      } else {
        alert('마음의 준비가 안됐닭! 다시 입장 시도를 해야겠닭!');
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
      console.log(response.data);
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
      console.log('search room', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
      console.log('search room error', error);
      alert(error.response.data.statusMsg);
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
      state.rooms.push(action.payload);
      window.location.href = `/gameroom/${action.payload.roomId}`;
    },
    [createRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [enterRoom.fulfilled]: (state, action) => {
      // console.log('enterRoom payload', action.payload);
      state.gameRoomResponseDtoList = action.payload;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      // console.log('action payload readAllRooms', action.payload);
      state.gameRoomResponseDtoList = action.payload.gameRoomResponseDtoList;
      state.totalPage = action.payload.totalPage;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [searchRoom.fulfilled]: (state, action) => {
      console.log('action payload searchRoom', action.payload);
      state.gameRoomResponseDtoList = action.payload;
    },
    [searchRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
