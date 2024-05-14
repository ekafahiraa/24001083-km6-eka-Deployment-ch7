import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

const googleSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setError, clearError } = googleSlice.actions;

export default googleSlice.reducer;
