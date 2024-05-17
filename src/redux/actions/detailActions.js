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
    dispatch(setLoading(true)); // Mengatur status loading menjadi true sebelum memulai permintaan data
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    ); // Mengambil detail film dari API
    dispatch(setDetailMovie(response.data)); // Menyimpan data detail film di reducers

    const trailerResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    ); // Mengambil trailer film dari API
    const trailers = trailerResponse.data.results.filter(
      (video) => video.type === "Trailer"
    ); // Menyaring hasil untuk mendapatkan trailer
    if (trailers.length > 0) {
      dispatch(setTrailer(trailers[0])); // Menyimpan trailer pertama yang ditemukan di reducers
    }

    // Mengecek apakah film sudah dalam daftar favorit
    const email = localStorage.getItem("email"); // Mengambil email dari localStorage
    const favoritesKey = `${email}-favorites`; // Membuat key untuk film favorit berdasarkan email
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || []; // Mengambil daftar film favorit dari localStorage
    const isFavorite = favorites.some((movie) => movie.id === response.data.id); // Memeriksa apakah film sudah ada di daftar favorit
    dispatch(setFavorite(isFavorite)); // Mengatur status favorit di reducers
  } catch (error) {
    console.error("Error fetching movie detail: ", error); // Error jika permintaan gagal
  } finally {
    dispatch(setLoading(false)); // Mengatur status loading menjadi false setelah permintaan selesai
  }
};

export const toggleFavorite = () => (dispatch, getState) => {
  const { isFavorite, detailMovieData } = getState().detail; // Mengambil status favorit dan detail film dari reducers
  const email = localStorage.getItem("email"); // Mengambil email dari localStorage
  const favoritesKey = `${email}-favorites`; // Membuat key untuk film favorit berdasarkan email
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || []; // Mengambil daftar film favorit dari localStorage

  if (!isFavorite) {
    favorites.push(detailMovieData); // Menambahkan film ke daftar favorit
    localStorage.setItem(favoritesKey, JSON.stringify(favorites)); // Menyimpan daftar favorit yang telah diperbarui ke localStorage
    dispatch(setFavorite(true)); // Mengatur status favorit menjadi true
    alert("Movie added to favorites!"); // Menampilkan pesan bahwa film telah ditambahkan ke favorit
  } else {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== detailMovieData.id
    ); // Menghapus film dari daftar favorit
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites)); // Menyimpan daftar favorit yang telah diperbarui ke localStorage
    dispatch(setFavorite(false)); // Mengatur status favorit menjadi false
    alert("Movie removed from favorites!"); // Menampilkan pesan bahwa film telah dihapus dari favorit
  }
};
