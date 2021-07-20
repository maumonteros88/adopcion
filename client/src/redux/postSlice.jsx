/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiConnect from "../api/configApi";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await apiConnect.get('/posts');
  return response.data.results;
});
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = "Success";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
  },
});

export const getPosts = (state) => state.posts.posts;
export const findPost = (id) => (state) =>
  state.posts.posts.find((post) => post._id === id);

export default postsSlice.reducer;
