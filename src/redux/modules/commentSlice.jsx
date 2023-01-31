import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api/core/axios';

const initialState = {
  comments: [],
  error: null,
  isLoading: false,
};

export const readComments = createAsyncThunk(
  'comment/READ_ALL_COMMENT',
  async (payload, thunkAPI) => {
    // console.log('comment payload', payload);
    try {
      const response = await instance.get(
        `/posts/${payload.id}/comments/all?page=${payload.commentPage}&size=10`,
      );
      // console.log('comment res', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [readComments.pending]: (state, action) => {
      state.comments = action.payload;
      state.isLoading = true;
    },
    [readComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    [readComments.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default commentSlice.reducer;
