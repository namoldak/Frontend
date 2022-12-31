import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authInstance } from "../../core/api/axios";



//해당 파일은 예시용 파일입니다 
//Slice 파일 작성전 참고용으로만 사용해주세요 :)


const initialState = {
 
};

export const readBeforeChat = createAsyncThunk(
  "chat/READ_BEFORE_CHAT",
  async (payload, thunkAPI) => {
    try {
      const response = await authInstance.get(`/chat/room/join/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.messageList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [readBeforeChat.pending]: (state) => {
      state.isLoading = true;
    },
    [readBeforeChat.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messageList = action.payload;
    },
    [readBeforeChat.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chatSlice.reducer;