import axios from "axios";
import {
  setDetailMovie,
  setLoading,
  setTrailer,
  setFavorite,
} from "../reducers/detailReducers";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export const detailMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    dispatch(setDetailMovie(response.data));

    // Fetch trailer
    const trailerResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const trailers = trailerResponse.data.results.filter(
      (video) => video.type === "Trailer"
    );
    if (trailers.length > 0) {
      dispatch(setTrailer(trailers[0]));
    }

    // Cek apakah film sudah dalam daftar favorit
    const email = localStorage.getItem("email");
    const favoritesKey = `${email}-favorites`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    const isFavorite = favorites.some((movie) => movie.id === response.data.id);
    dispatch(setFavorite(isFavorite)); // Atur status favorit di reducers
  } catch (error) {
    console.error("Error fetching movie detail: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleFavorite = () => (dispatch, getState) => {
  const { isFavorite, detailMovieData } = getState().detail;
  const email = localStorage.getItem("email");
  const favoritesKey = `${email}-favorites`;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  if (!isFavorite) {
    favorites.push(detailMovieData);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    dispatch(setFavorite(true));
    alert("Movie added to favorites!");
  } else {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== detailMovieData.id
    );
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    dispatch(setFavorite(false));
    alert("Movie removed from favorites!");
  }
};
