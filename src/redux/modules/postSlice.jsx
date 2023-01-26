import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  posts: [],
  error: null,
};

export const createPost = createAsyncThunk(
  'post/CREATE_POST',
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const formData = new FormData();
      const json = JSON.stringify(payload.post);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('data', blob);
      formData.append('file', payload.img);

      const response = await instance.post('/posts/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const readAllPosts = createAsyncThunk(
  'post/READ_ALL_POST',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/all`);
      console.log('readall response', response.data);
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

export const readOnePost = createAsyncThunk(
  'post/READ_ONE_POST',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`posts/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

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

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      console.log(action);
      console.log(action.payload);
      // state.posts.postResponseDtoList.push(action.payload);
      window.location.href = `/posts/${action.payload.id}`;
      state.isLoading = false;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [readAllPosts.fulfilled]: (state, action) => {
      console.log('readAll action', action.payload);
      state.posts = action.payload;
    },
    [readPostsByCategory.fulfilled]: (state, action) => {
      console.log('readCategory action payload', action.payload);
      state.posts = action.payload;
    },
    [readPostsByCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [createComment.fulfilled]: (state, action) => {
      console.log('state', state);
    },
  },
});

export default postSlice.reducer;
