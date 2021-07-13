import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../redux/postSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
