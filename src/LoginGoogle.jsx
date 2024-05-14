import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./redux/actions/googleActions";

export default function LoginGoogle({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Menghandle login dengan Google
  const handleLoginWithGoogle = async (responseGoogle) => {
    const accessToken = responseGoogle.access_token; // Mendapatkan access token dari response Google
    dispatch(loginWithGoogle(accessToken, navigate)); // Memanggil fungsi loginWithGoogle dengan access token dan fungsi navigate
  };

  // Menggunakan useGoogleLogin untuk login dengan Google
  const googleLoginHandler = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function"); // Menyimpan informasi login di local storage
      handleLoginWithGoogle(responseGoogle); // Memanggil fungsi handleLoginWithGoogle dengan response Google
    },
  });

  return (
    <button
      variant="primary"
      onClick={googleLoginHandler}
      className="bg-[#323643] text-white py-3 rounded-full focus:outline-none focus:ring transition-colors duration-300 hover:bg-gray-700 active:bg-gray-700 flex items-center justify-center gap-2 w-[350px] ease-in-out transform hover:scale-105"
    >
      <FcGoogle className="w-6 h-6 mr-4" />
      {buttonText}
    </button>
  );
}
