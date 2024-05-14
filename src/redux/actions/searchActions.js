import axios from "axios";
import {
  setSearchResults,
  setTotalPages,
  setNotFound,
} from "../reducers/searchReducers";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export const searchMovies =
  (query, page = 1) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`,
        { headers: { accept: "application/json" } }
      );

      // Jika tidak ada hasil dari pencarian
      if (response.data.results.length === 0) {
        dispatch(setSearchResults([])); // Hasil pencarian kosong
        dispatch(setTotalPages(1)); // Total halaman menjadi 1
        dispatch(setNotFound(true)); // Status pencarian not found menjadi true
      } else {
        // Jika ada hasil dari pencarian
        dispatch(setSearchResults(response.data.results)); // Hasil pencarian dari response API
        dispatch(setTotalPages(response.data.total_pages)); // Total halaman hasil pencarian dari response API
        dispatch(setNotFound(false)); // Status pencarian not found menjadi false
      }
    } catch (error) {
      // Jika terjadi error saat melakukan request
      console.error("Error searching movies: ", error);
      dispatch(setNotFound(true)); // Status pencarian not found menjadi true
    }
  };
