import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";
import { FaPlay } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { setCurrentSlide } from "./redux/reducers/movieReducers";
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
} from "./redux/actions/movieActions"; // Actions untuk fetch data film

export default function Home() {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state?.movies?.currentSlide); // Mengambil currentSlide menggunakan useSelector
  const popularMovies = useSelector((state) => state?.movies?.popularMovies); // Mengambil data popularMovies dari Reducers menggunakan useSelector
  const nowPlayingMovies = useSelector(
    (state) => state?.movies?.nowPlayingMovies
  ); // Mengambil data nowPlayingMovies dari Reducers menggunakan useSelector
  const trendingMovies = useSelector((state) => state?.movies?.trendingMovies); // Mengambil data trendingMovies dari Reducers menggunakan useSelector
  const navigate = useNavigate();

  // Mengambil data film di actions
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);

  // Mengatur interval untuk mengganti slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      // Membersihkan interval jika tidak lagi digunakan
      dispatch(setCurrentSlide((currentSlide + 1) % popularMovies?.length)); // Bergantung pada nilai slide saat ini dan daftar popularMovies
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, dispatch, popularMovies?.length]);

  // Mengambil data film di actions
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchTrendingMovies());
    dispatch(setCurrentSlide(0));
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
      <>
        <div className="carousel">
          {popularMovies?.map((movie, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentSlide ? "show" : ""
              }`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="overlay flex flex-col items-start justify-end h-full px-6 pb-10 text-white">
                <h1 className="text-6xl l:text-4xl lg:text-4xl text-white font-semibold mb-3 max-w-md">
                  "{movie.title}"
                </h1>
                <p className="text-white text-sm md:text-base max-w-md">
                  <span style={{ fontStyle: "italic" }}>
                    {movie.overview.slice(0, 100)}...
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Navbar />
        </div>

        <div className="min-h-screen bg-[#2C2C2C] text-white p-10">
          <div className="flex items-center">
            <div className="w-2 h-10 bg-[#B22222]"></div>
            <h2 className="text-3xl font-bold ml-4">POPULAR MOVIES</h2>
            <Link
              to="/popular-movie"
              className="flex items-center border border-gray-300 bg-[#B22222] text-white py-1 px-4 ml-auto rounded hover:bg-red-900 hover:border-red-900 transition-colors duration-300"
            >
              <span>Show More</span>
              <FaArrowRightLong className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8 mt-10">
            {popularMovies &&
              popularMovies.map((movie) => (
                <div
                  className="cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie.id } });
                  }}
                >
                  <img
                    className="rounded-xl h-150 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />

                  <div style={{ fontFamily: "sans-serif" }}>
                    <div className="font-m font-bold truncate">
                      {movie.title}
                    </div>

                    <div className="flex justify-between">
                      <div className="font-sm">({movie.release_date})</div>
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

          <div className="flex items-center mt-20 mb-4">
            <div className="w-2 h-10 bg-[#B22222]"></div>
            <h2 className="text-3xl font-bold ml-4">NOW PLAYING MOVIES</h2>
            <Link
              to="/now-playing-movie"
              className="flex items-center border border-gray-300 bg-[#B22222] text-white py-1 px-4 ml-auto rounded hover:bg-red-900 hover:border-red-900 transition-colors duration-300"
            >
              Show More
              <FaArrowRightLong className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8 mt-10">
            {nowPlayingMovies &&
              nowPlayingMovies.map((movie) => (
                <div
                  className="cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie.id } });
                  }}
                >
                  <img
                    className="rounded-xl h-150 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <div className="mx-2 mt-3 text-white">
                    <div className="font-m font-bold truncate">
                      {movie.title}
                    </div>
                    <div className="flex justify-between">
                      <div className="font-sm">({movie.release_date})</div>
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

          <div className="flex items-center mt-20 mb-4">
            <div className="w-2 h-10 bg-[#B22222]"></div>
            <h2 className="text-3xl font-bold ml-4">TRENDING MOVIES</h2>
            <Link
              to="/trending-movie"
              className="flex items-center border border-gray-300 bg-[#B22222] text-white py-1 px-4 ml-auto rounded hover:bg-red-900 hover:border-red-900 transition-colors duration-300"
            >
              Show More
              <FaArrowRightLong className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8 mt-10">
            {trendingMovies &&
              trendingMovies.map((movie) => (
                <div
                  className="cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie.id } });
                  }}
                >
                  <img
                    className="rounded-xl h-150 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <div className="mx-2 mt-3 text-white">
                    <div className="font-m font-bold truncate">
                      {movie.title}
                    </div>
                    <div className="flex justify-between">
                      <div className="font-sm">({movie.release_date})</div>
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
      </>
      <Footer />
    </div>
  );
}
