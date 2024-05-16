import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircle, FaPlay } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { detailMovie, toggleFavorite } from "./redux/actions/detailActions";

export default function DetailMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailMovieData, isLoading, trailer, isFavorite } = useSelector(
    (state) => state.detail
  );
  const location = useLocation();
  const movieId = location.state?.id;

  useEffect(() => {
    if (movieId) {
      dispatch(detailMovie(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("Access restricted. Please log in to continue.");
      navigate("/login-user");
    }
  }, []);

  const handleToggleFavorite = () => {
    if (localStorage.getItem("email")) {
      dispatch(toggleFavorite());
    } else {
      alert("Please log in to add to favorites.");
      navigate("/login-user");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <section className="h-screen overflow-auto">
          <div className="mt-60" key={detailMovieData?.title}>
            <div className="absolute top-0 w-full h-screen flex items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${detailMovieData?.poster_path}`}
                className="w-full h-screen object-cover"
                alt={detailMovieData?.title}
              />
              <div className="absolute p-24 w-full h-screen bg-black/80 flex items-center overflow-auto">
                <div className="container overflow-auto">
                  <div className="flex gap-6 mt-12 items-center">
                    <div className="w-1/4 mr-5 flex flex-col items-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${detailMovieData?.poster_path}`}
                        className="!w-[500px] object-cover rounded-lg shadow-primary shadow-lg"
                        alt={detailMovieData?.title}
                      />
                      {trailer && (
                        <div className="mt-6">
                          <button
                            className="flex items-center border border-gray-300 bg-[#EDBC2B] text-white px-10 py-1.5 rounded-lg hover:bg-[#A66718] hover:border-[#A66718] transition-colors duration-300"
                            onClick={() =>
                              window.open(
                                `https://www.youtube.com/watch?v=${trailer.key}`,
                                "_blank"
                              )
                            }
                          >
                            <FaPlay className="w-4 h-4 mr-2" /> Watch Trailer
                          </button>
                        </div>
                      )}
                      <div className="mt-3">
                        <button
                          className="flex items-center border border-gray-300 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 hover:border-blue-700 transition-colors duration-300"
                          onClick={handleToggleFavorite}
                        >
                          {isFavorite ? (
                            <>
                              <MdFavorite className="w-6 h-6 mr-2" /> Added to
                              Favorites
                            </>
                          ) : (
                            <>
                              <MdFavoriteBorder className="w-6 h-6 mr-2" /> Add
                              to Favorite
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="w-3/4 flex flex-col justify-between text-white overflow-auto">
                      <div className="flex flex-col overflow-auto">
                        <p className="text-4xl font-bold mb-4">
                          "{detailMovieData?.title}"
                        </p>
                        <div className="w-full h-0.5 bg-gradient-to-r from-white"></div>
                        <p className="mt-4 mb-4 text-justify">
                          <span style={{ fontStyle: "italic" }}>
                            {detailMovieData?.overview}
                          </span>
                        </p>
                        <h1 className="text-lg font-semibold mt-1">
                          Release Date:
                        </h1>
                        <p className="text-white font-normal text-base mt-2">
                          {detailMovieData?.release_date}
                        </p>
                        <h1 className="text-lg font-semibold mt-6">Genres:</h1>
                        <div className="flex gap-4 mt-2">
                          {detailMovieData?.genres &&
                            detailMovieData?.genres.map((genre) => (
                              <div key={genre.id} className="flex items-center">
                                <FaCircle className="text-primary text-[#B22222]" />
                                <p className="ml-2">{genre.name}</p>
                              </div>
                            ))}
                        </div>
                        <h1 className="text-lg font-semibold mt-6">Rating:</h1>
                        <p className="text-white font-normal text-base mt-2">
                          {detailMovieData?.vote_average} / 10
                        </p>
                        <h1 className="text-lg font-semibold mt-6">
                          Production Companies:
                        </h1>
                        <div className="text-white font-normal text-base mt-2">
                          {detailMovieData?.production_companies &&
                            detailMovieData?.production_companies.map(
                              (company, index) => (
                                <span key={company.id}>
                                  {company.name}
                                  {index !==
                                    detailMovieData.production_companies
                                      .length -
                                      1 && ", "}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
