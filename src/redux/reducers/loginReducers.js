import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
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

export const {
  setEmail,
  setPassword,
  setShowPassword,
  setUser,
  setError,
  clearError,
} = loginSlice.actions;

export default loginSlice.reducer;
