import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userdata: null,
  profile: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = "true";
      state.userdata = action.payload.userdata;
      state.profile = action.payload.profile.documents[0];
    },
    logout: (state) => {
      state.status = false;
      state.userdata = null;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
