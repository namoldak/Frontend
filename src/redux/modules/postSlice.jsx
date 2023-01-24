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

export const readAllPosts = createAsyncThunk(
  'post/READ_ALL_POST',
  async (thunkAPI) => {
    try {
      const response = await instance.get(`/posts/all`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const readPostsByCategory = createAsyncThunk(
  'post/READ_POST_BY_CATEGORY',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/posts/category?category=${payload}`,
      );
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
    [readAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [readAllPosts.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [readPostsByCategory.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [readPostsByCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default postSlice.reducer;
