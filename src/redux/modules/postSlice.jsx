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
      for (let i = 0; i < payload.imgs.length; i += 1) {
        formData.append('file', payload.imgs[i]);
      }

      const response = await instance.post(`/posts/write`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res data', response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updatePost = createAsyncThunk(
  'post/UPDATE_POST',
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();
      const json = JSON.stringify(payload.post);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('data', blob);
      for (let i = 0; i < payload.imgs.length; i += 1) {
        formData.append('file', payload.imgs[i]);
      }
      const response = await instance.put(
        `/posts/${payload.postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
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
    console.log('payload', payload);
    try {
      const response = await instance.get(`posts/${payload}`);
      console.log('res', response);
      return thunkAPI.fulfillWithValue(response.data[0]);
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
      console.log(action.payload.id);
      window.location.href = `/posts/${action.payload.id}`;
      state.isLoading = false;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
      console.log('readCategory action payload', action.payload);
      state.posts = action.payload;
    },
    [readPostsByCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      console.log(action.payload);
      window.location.href = `/posts/${action.payload.id}`;
      state.isLoading = false;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
