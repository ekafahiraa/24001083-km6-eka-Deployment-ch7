import axios from "axios";
import {
  setDetailMovie,
  setLoading,
  setTrailer,
} from "../reducers/detailReducers";

const API_KEY = "af37b503324b91c3940d26917c0251fc";

export const detailMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Mengatur isLoading menjadi true saat permintaan dimulai
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    dispatch(setDetailMovie(response.data)); // Detail film ke Reducers
    // console.log("response", response);

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
  } catch (error) {
    console.error("Error fetching movie detail: ", error);
  } finally {
    dispatch(setLoading(false)); // Mengatur isLoading menjadi false setelah permintaan selesai
  }
};
