import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSlide } from "./redux/reducers/movieReducers";
import { fetchPopularMovies } from "./redux/actions/movieActions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

export default function LandingPage() {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state?.movies?.currentSlide);
  const popularMovies = useSelector((state) => state?.movies?.popularMovies);
  const movies = useSelector((state) => state?.movies);
  console.log("movies: ", movies);
  console.log("popular movies: ", popularMovies);

  useEffect(() => {
    dispatch(setCurrentSlide(0));
    dispatch(fetchPopularMovies());
  }, []);

  // Mengatur interval untuk mengganti slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      // Membersihkan interval jika tidak lagi digunakan
      dispatch(setCurrentSlide((currentSlide + 1) % popularMovies?.length));
    }, 2000); // Bergantung pada nilai slide saat ini dan daftar popularMovies

    return () => clearInterval(interval);
  }, [currentSlide, dispatch, popularMovies?.length]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
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
                <h1 className="text-5xl l:text-5xl lg:text-5xl text-white font-semibold mb-3 max-w-md">
                  "{movie.title}"
                </h1>
                <p className="text-white text-base md:text-base max-w-md">
                  <span style={{ fontStyle: "italic" }}>
                    {movie.overview.slice(0, 100)}...
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
      <div>
        <Footer />
      </div>
    </div>
  );
}
