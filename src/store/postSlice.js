import { createSlice } from "@reduxjs/toolkit";
//TODO:later
const initialValues = {
  posts: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialValues,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    postDelete: (state, action) => {
      state.posts = state.posts.filter((post) => {
        if (post.$id !== action.payload) {
          return post;
        }
      });
    },
    postupdate: (state, action) => {
      state.posts = state.posts.filter((post) => {
        if (post.$id == action.payload.$id) {
          return action.payload;
        }
        return post;
      });
    },
    postAdd: (state, action) => {
      state.posts.append(action.payload);
    },
  },
});
export const { setPosts, postDelete, postupdate, postAdd } = postSlice.actions;
export default postSlice.reducer;
