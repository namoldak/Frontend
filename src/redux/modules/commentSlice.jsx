import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  commentList: [],
  error: null,
};

export const createComment = createAsyncThunk(
  'comment/CREATE_COMMENT',
  async (payload, thunkAPI) => {
    console.log('comment payload', payload);
    try {
      const response = await instance.post(
        `/posts/${payload.id}/comments`,
        payload,
      );
      console.log('comment response', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('comment error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.fulfilled]: (state, action) => {
      console.log('state', state.commentList);
      console.log('action paylaod', action.payload);
      state.commentList.push(action.payload);
    },
  },
});

export default commentSlice.reducer;
