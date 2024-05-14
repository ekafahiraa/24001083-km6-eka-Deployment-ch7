import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  password: "",
  showPassword: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
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
  setName,
  setPassword,
  setShowPassword,
  setError,
  clearError,
} = registerSlice.actions;

export default registerSlice.reducer;
