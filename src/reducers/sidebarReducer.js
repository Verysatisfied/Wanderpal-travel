// reducers/sidebarReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarHidden: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarHidden = !state.isSidebarHidden;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
