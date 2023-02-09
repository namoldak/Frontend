import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
};

export const readAllPosts = createAsyncThunk(
  'post/READ_ALL_POST',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/posts?category=freeBoard&page=${payload}&size=5`,
      );
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
        `/posts/myPost?category=${payload.category}&page=${payload.page}&size=5`,
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const readOnePost = createAsyncThunk(
  'post/READ_ONE_POST',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`posts/${payload}`);
      return thunkAPI.fulfillWithValue(response.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const searchPosts = createAsyncThunk(
  `post/SEARCH_POSTS`,
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `posts/search?category=freeBoard&page=${payload.page}&keyword=${payload.keyword}`,
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
    [readOnePost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [readPostsByCategory.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [readPostsByCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [searchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [searchPosts.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
