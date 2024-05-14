import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNowPlayingMovies } from "./redux/actions/movieActions";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PopularMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allNowPlayingMovies = useSelector(
    (state) => state?.movies?.allNowPlayingMovies
  ); // Mengambil data allTrendingMovies dari Reducers menggunakan useSelector

  // Mengambil semua data allTrendingMovies dari Actions
  useEffect(() => {
    dispatch(fetchAllNowPlayingMovies());
  }, [dispatch]);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    // Memeriksa apakah item token ada di localStorage
    if (localStorage.getItem("token") === null) {
      // Menampilkan pesan alert kepada pengguna untuk login terlebih dahulu
      alert("Access restricted. Please log in to continue.");
      // Mengarahkan pengguna ke halaman login
      navigate("/login-user");
    }
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-[#2C2C2C] text-white pt-20">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-white font-bold text-3xl mt-10 mb-5">
              NOW PLAYING MOVIES
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {allNowPlayingMovies?.map((movie) => (
                <div
                  className="w-56 cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie.id } });
                  }}
                >
                  <img
                    className="rounded-xl h-400 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <div className="mx-2 mt-3 text-white">
                    <div className="font-bold truncate">{movie.title}</div>
                    <div className="flex justify-between">
                      <div className="font-light">({movie.release_date})</div>
                      <div className="flex justify-between items-center gap-2 ">
                        <div className="w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="#FFD43B"
                              d="M316.9 18C311.6 7 300.4 0 288.1  0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />
                          </svg>
                        </div>
                        <div>{movie?.vote_average?.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
