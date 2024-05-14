import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  notFound: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.movies = action.payload;
      state.notFound = action.payload.length === 0;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setNotFound: (state, action) => {
      state.notFound = action.payload;
    },
  },
});

export const { setSearchResults, setTotalPages, setNotFound } =
  searchSlice.actions;

export default searchSlice.reducer;
