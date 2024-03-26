// userImageSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const userImageSlice = createSlice({
  name: "userImage",
  initialState: {
    image: null,
    error: null,
    loading: false,
  },
  reducers: {
    uploadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.loading = false;
      state.image = action.payload;
      state.error = null;
    },
    uploadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure } =
  userImageSlice.actions;

export default userImageSlice.reducer;
