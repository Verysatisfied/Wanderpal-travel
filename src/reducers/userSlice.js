import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const user = { name, email, id: Date.now() }; // Simulate user data
      addUserToLocalStorage(user);
      return fulfillWithValue(user);
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const user = getUserFromLocalStorage();
      if (user && user.email === email) {
        return fulfillWithValue(user);
      } else {
        return rejectWithValue("User not found or password incorrect");
      }
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ name, email }, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const user = { ...getState().user.user, name, email };
      addUserToLocalStorage(user);
      return fulfillWithValue(user);
    } catch (error) {
      return rejectWithValue("Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      removeUserFromLocalStorage();
      toast.info("Logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success(`Hello There ${action.payload.name}`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success(`Welcome Back ${action.payload.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("User updated!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
