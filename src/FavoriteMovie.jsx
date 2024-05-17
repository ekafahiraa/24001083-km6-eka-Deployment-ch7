import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FavoriteMovie() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]); // State untuk menyimpan daftar film favorit
  const token = localStorage.getItem("token"); // Mengambil token dari localStorage
  const email = localStorage.getItem("email"); // Mengambil email dari localStorage

  useEffect(() => {
    if (!token) {
      // Menampilkan pesan jika token tidak ditemukan
      alert("Access restricted. Please log in to continue.");
      navigate("/login-user");
      return;
    }

    if (!email) {
      // Menampilkan pesan jika email tidak ditemukan
      alert("User email not found. Please log in again.");
      navigate("/login-user");
      return;
    }

    const favoritesKey = `${email}-favorites`; // Membuat key untuk film favorit berdasarkan email
    const storedFavorites =
      JSON.parse(localStorage.getItem(favoritesKey)) || []; // Mengambil daftar film favorit dari localStorage
    setMovies(storedFavorites); // Menyimpan daftar film favorit ke state
  }, [navigate, token, email]); // Menjalankan ketika navigate, token, atau email berubah

  const removeFromFavorites = (id) => {
    // Menampilkan konfirmasi penghapusan salah satu film favorit
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this movie from favorites?"
    );
    if (confirmRemove) {
      const favoritesKey = `${email}-favorites`; // Membuat key untuk film favorit berdasarkan email
      const updatedFavorites = movies.filter((movie) => movie.id !== id); // Menghapus film dari daftar favorit
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites)); // Menyimpan daftar favorit yang telah diperbarui ke localStorage
      setMovies(updatedFavorites); // Memperbarui state dengan daftar favorit yang telah diperbarui
    }
  };

  const removeAllFavorites = () => {
    // Menampilkan konfirmasi penghapusan semua film favorit
    const confirmRemoveAll = window.confirm(
      "Are you sure you want to remove all favorite movies?"
    );
    if (confirmRemoveAll) {
      const favoritesKey = `${email}-favorites`; // Membuat key untuk film favorit berdasarkan email
      localStorage.removeItem(favoritesKey); // Menghapus semua film favorit dari localStorage
      setMovies([]); // Mengosongkan state daftar film favorit
    }
  };

  return (
    <div
      className="font-poppins"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar />
      <div className="min-h-screen bg-[#2C2C2C] text-white pt-20">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-white font-bold text-3xl mt-10 mb-5">
              FAVORITE MOVIES
            </p>
            {movies.length === 0 ? (
              <div className="text-white text-center text-2xl font-semibold mt-20">
                <p className="mb-2">No favorite movies added.</p>
                <p className="text-sm text-gray-400">
                  Start adding your favorite movies to see them here!
                </p>
              </div>
            ) : (
              <>
                <button
                  className="mb-4 border border-gray-300 bg-[#B22222] text-white px-5 py-1.5 rounded-lg hover:bg-red-900 hover:border-red-900 transition-colors duration-3000"
                  onClick={removeAllFavorites}
                >
                  Remove All Favorite Movies
                </button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                  {movies.map((movie) => (
                    <div
                      className="w-56 cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                      key={movie.id}
                    >
                      <img
                        className="rounded-xl h-96 transition-transform duration-300 ease-in-out transform hover:scale-110"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        onClick={() => {
                          navigate("/movie-details", {
                            state: { id: movie.id },
                          });
                        }}
                      />
                      <div className="mx-2 mt-3 text-white">
                        <div className="font-bold truncate">{movie.title}</div>
                        <div className="flex justify-between">
                          <div className="font-light">
                            ({movie.release_date})
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <div className="w-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="#FFD43B"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                />
                              </svg>
                            </div>
                            <div>{movie.vote_average.toFixed(1)}</div>
                          </div>
                        </div>
                        <button
                          className="mt-2 border border-gray-300 bg-[#B22222] text-white px-5 py-1.5 ml-auto rounded-lg hover:bg-red-900 hover:border-red-900 transition-colors duration-3000"
                          onClick={() => removeFromFavorites(movie.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
