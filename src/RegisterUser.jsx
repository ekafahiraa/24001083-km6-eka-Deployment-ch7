import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { registerUser } from "./redux/actions/registerActions";
import {
  setEmail,
  setName,
  setPassword,
  setShowPassword,
  clearError,
} from "./redux/reducers/registerReducers";
import Navbar from "./Navbar";
import Footer from "./Footer";
import backgroundImage from "./bglogin.png";

export default function RegisterUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name, password, showPassword, error } = useSelector(
    (state) => state.register
  ); // Mengambil data dari Reducers menggunakan useSelector

  useEffect(() => {
    return () => {
      // Membersihkan nilai email dan password saat komponen unmount
      dispatch(setEmail("")); // Mengatur email ke nilai kosong ke Reducers
      dispatch(setName("")); // Mengatur nama ke nilai kosong ke Reducers
      dispatch(setPassword("")); // Mengatur password ke nilai kosong ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
    };
  }, [dispatch]);

  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value)); // Actions untuk mengatur email ke Reducers
  };

  const handleNameChange = (event) => {
    dispatch(clearError());
    dispatch(setName(event.target.value)); // Actions untuk mengatur nama ke Reducers
  };

  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value)); // Actions untuk mengatur password ke Reducers
  };

  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword)); // Actions untuk mengatur showPassword ke Reducers
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!email || !name || !password) {
      alert("Please fill in all data first.");
      return;
    }

    if (!email.includes("@")) {
      alert("Email must contain '@' character.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, including uppercase letters and numbers."
      );
      return;
    }

    dispatch(registerUser(email, name, password, navigate)); // Mengirim actions register ke Reducers dengan email, name, password, dan navigate function
  };

  const passwordInputType = showPassword ? "text" : "password"; // Menentukan tipe input untuk password

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
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
            <h1 className="text-white text-3xl font-bold mt-10 mb-2 text-center">
              Create New Account
            </h1>
            <h2 className="text-white text-l mb-14 text-center">
              Please enter your details
            </h2>

            <form
              onSubmit={handleRegister}
              className="max-w-md mx-auto w-[350px]"
            >
              <div className="flex flex-col items-center space-y-5">
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
                  <MdEmail className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
                  <BsPersonFill className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={handleNameChange}
                  />
                </div>
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
                  <BiSolidLock className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type={passwordInputType}
                    value={password}
                    placeholder="Password"
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

                <button className="bg-[#B22222] text-white py-3 rounded-full focus:outline-none focus:ring w-full transition-colors duration-300 hover:bg-red-900 active:bg-red-900 ease-in-out transform hover:scale-105">
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-white mt-7 mb-5">
              Already Registered?{" "}
              <a
                href="/login-user"
                className="text-blue-400 font-semibold border-blue-400"
              >
                Login Here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
