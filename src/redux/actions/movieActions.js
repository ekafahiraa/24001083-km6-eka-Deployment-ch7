import axios from "axios";
import {
  setPopularMovies,
  setNowPlayingMovies,
  setTrendingMovies,
  setAllPopularMovies,
  setAllNowPlayingMovies,
  setAllTrendingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
} from "../reducers/movieReducers";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

// Fungsi untuk fetch data Popular Movies pada Home
export const fetchPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=false`
    );
    console.log("response: ", response);
    dispatch(setPopularMovies(response.data.results.slice(0, 8))); // Mengatur jumlah daftar film yang ditampilkan ke Reducers
  } catch (error) {
    console.error("Error fetching popular movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch data Now Playing Movies pada Home
export const fetchNowPlayingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch(setNowPlayingMovies(response.data.results.slice(0, 8))); // Mengatur jumlah daftar film yang ditampilkan ke Reducers
  } catch (error) {
    console.error("Error fetching now playing movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch data Trending Movies pada Home
export const fetchTrendingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`
    );
    dispatch(setTrendingMovies(response.data.results.slice(0, 8))); // Mengatur jumlah daftar film yang ditampilkan ke Reducers
  } catch (error) {
    console.error("Error fetching trending movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch semua data Popular Movies
export const fetchAllPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=false`
    );
    dispatch(setAllPopularMovies(response.data.results));
  } catch (error) {
    console.error("Error fetching popular movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch semua data Now Playing Movies
export const fetchAllNowPlayingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch(setAllNowPlayingMovies(response.data.results));
  } catch (error) {
    console.error("Error fetching all now playing movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch semua data Trending Movies
export const fetchAllTrendingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`
    );
    dispatch(setAllTrendingMovies(response.data.results));
  } catch (error) {
    console.error("Error fetching trending movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch semua data Upcoming Movies
export const fetchUpcomingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    dispatch(setUpcomingMovies(response.data.results));
  } catch (error) {
    console.error("Error fetching upcoming movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};

// Fungsi untuk fetch semua data Top Rated Movies
export const fetchTopRatedMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    dispatch(setTopRatedMovies(response.data.results));
  } catch (error) {
    console.error("Error fetching top rated movies: ", error); // Menampilkan pesan error jika terjadi kesalahan
  }
};
