import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasPaid: false,
};

export const paySlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.hasPaid = action.payload;
    },
  },
});

export const { setPaymentStatus } = paySlice.actions;

export default paySlice.reducer;
