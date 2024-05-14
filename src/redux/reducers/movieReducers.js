import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSlide: 0,
  popularMovies: [],
  nowPlayingMovies: [],
  trendingMovies: [],
  allPopularMovies: [],
  allNowPlayingMovies: [],
  allTrendingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    setAllPopularMovies: (state, action) => {
      state.allPopularMovies = action.payload;
    },
    setAllNowPlayingMovies: (state, action) => {
      state.allNowPlayingMovies = action.payload;
    },
    setAllTrendingMovies: (state, action) => {
      state.allTrendingMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});

export const {
  setCurrentSlide,
  setPopularMovies,
  setNowPlayingMovies,
  setTrendingMovies,
  setAllPopularMovies,
  setAllNowPlayingMovies,
  setAllTrendingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
