import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  posts: [],
  error: null,
};

export const createPost = createAsyncThunk(
  'post/CREATE_POST',
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();
      const json = JSON.stringify(payload.post);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('postRequestDto: ', blob);
      formData.append('data', payload.img);

      const response = await instance.post('/posts/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default postSlice.reducer;
