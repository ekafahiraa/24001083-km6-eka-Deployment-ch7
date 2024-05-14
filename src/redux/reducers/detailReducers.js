import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailMovieData: null,
  isLoading: false,
  trailer: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetailMovie: (state, action) => {
      state.detailMovieData = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export const { setDetailMovie, setLoading, setTrailer } = detailSlice.actions;

export default detailSlice.reducer;
