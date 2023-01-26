// import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
// import { instance } from 'api/core/axios';

// const initialState = {
//   commentList: [],
//   error: null,
// };

// export const createComment = createAsyncThunk(
//   'comment/CREATE_COMMENT',
//   async (payload, thunkAPI) => {
//     console.log('comment payload', payload);
//     try {
//       const response = await instance.post(
//         `/posts/${payload.id}/comments`,
//         payload,
//       );
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       console.log('comment error', error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const editComment = createAsyncThunk(
//   'comment/EDIT_COMMENT',
//   async (payload, thunkAPI) => {
//     console.log('comment edit', payload);
//     try {
//       const response = await instance.put(
//         `/posts/comments/${payload.id}`,
//         payload,
//       );
//       console.log('edit comment', response);
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const deleteComment = createAsyncThunk(
//   'comment/DELTE_COMMENT',
//   async (payload, thunkAPI) => {
//     console.log('comment delete', payload);
//     try {
//       await instance.delete(`/posts/comments/${payload}`);
//       return payload;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const commentSlice = createSlice({
//   name: 'commentList',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [createComment.fulfilled]: (state, action) => {
//       // state.commentList.push(action.payload);
//       // console.log('추가된 상태:', current(state.commentList));
//     },
//     [createComment.rejected]: (state, action) => {
//       state.commentList = action.error;
//     },
//     [editComment.fulfilled]: (state, action) => {
//       console.log(action.payload);
//     },
//     [deleteComment.fulfilled]: (state, action) => {},
//   },
// });

// export default commentSlice.reducer;
