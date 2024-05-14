import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import LoginGoogle from "./LoginGoogle";
import backgroundImage from "./bglogin.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { loginUser } from "./redux/actions/loginActions";
import {
  setEmail,
  setPassword,
  setShowPassword,
  clearError,
} from "./redux/reducers/loginReducers";

export default function LoginUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, showPassword, error } = useSelector(
    (state) => state.login
  ); // Mengambil data dari Reducers menggunakan useSelector

  useEffect(() => {
    return () => {
      // Membersihkan nilai email dan password saat komponen unmount
      dispatch(setEmail("")); // Mengatur email ke nilai kosong ke Reducers
      dispatch(setPassword("")); // Mengatur password ke nilai kosong ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
    };
  }, [dispatch]);

  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value)); // Actions untuk mengatur email ke Reducers
  };

  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value)); // Actions untuk mengatur password ke Reducers
  };

  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword)); // Actions untuk mengatur showPassword ke Reducers
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password!");
      return;
    }
    dispatch(loginUser(email, password, navigate)); // Mengirim actions login ke Reducers dengan email, password, dan navigate function
  };

  const passwordInputType = showPassword ? "text" : "password";

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div>
        <Navbar />
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px",
        }}
      >
        <div className="max-w-[500px] w-full rounded-xl ml-10 mt-10 mb-10 py-2 px-2 pb-5 pt-7">
          <div className="max-w-[650px] mx-auto flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold my-10 text-left">
              Welcome Back!
            </h1>

            <form onSubmit={handleSubmit} className="max-w-md w-[350px]">
              <div className="flex flex-col space-y-5">
                <div className="flex items-center bg-gray-200 p-3 rounded-full border-1">
                  <MdEmail className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex items-center bg-gray-200 p-3 rounded-full border-1">
                  <BiSolidLock className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type={passwordInputType}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* Ikon mata yang bisa di-klik untuk menampilkan atau menyembunyikan password */}
                  {showPassword ? (
                    <BiShow
                      className="w-[25px] h-[25px] cursor-pointer ease-in-out transform hover:scale-125"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <BiHide
                      className="w-[25px] h-[25px] cursor-pointer ease-in-out transform hover:scale-125"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <button
                  type="Submit"
                  className="bg-[#B22222] text-white py-3 rounded-full focus:outline-none focus:ring w-full transition-colors duration-300 hover:bg-red-900 active:bg-red-900 ease-in-out transform hover:scale-105"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="relative w-[350px] mt-10 mb-10">
              <hr className="absolute left-0 right-0 border-t-2 border-gray-100" />
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-white">
                or
              </p>
            </div>

            <LoginGoogle buttonText={"Continue with Google"} />

            <p className="text-white mt-7 mb-5">
              Don't have an account yet?{" "}
              <a
                href="/register-user"
                className="text-blue-400 font-semibold border-blue-400"
              >
                Sign Up
              </a>
            </p>

            {error && error !== null && <div>{alert(error)}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
