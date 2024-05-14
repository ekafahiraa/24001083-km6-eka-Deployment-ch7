import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import backgroundImage from "./bguser.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchAuthUser } from "./redux/actions/authActions";

export default function AuthUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Mengambil data user dari Reducers menggunakan useSelector

  // Mengambil data pengguna
  useEffect(() => {
    dispatch(fetchAuthUser());
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
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <div className="bg-[#B22222] max-w-[400px] w-full rounded-xl mt-10 mb-10 py-2 px-2 pb-5 pt-3 mr-14">
          <div className="max-w-[450px] mx-auto flex flex-col justify-center items-center">
            <p className="text-3xl text-white font-semibold mt-5 mb-5 text-center">
              Your Profiles
            </p>
            {user && (
              <>
                <p className="text-2xl text-white font-bold mb-5 flex items-center">
                  <IoPersonCircleOutline className="mr-2 w-8 h-8" />
                  {user.name}
                </p>

                <div className="text-left text-white mt-7 mb-5">
                  <p className="font-medium">
                    <span className="mr-2 my-6 font-semibold">Name:</span>
                    {user.name}
                  </p>
                  <p className="font-medium">
                    <span className="mr-2 my-6 font-semibold">Email:</span>
                    {user.email}
                  </p>
                  <p className="font-medium">
                    <span className="mr-2 my-6 font-semibold">Joined:</span>
                    {user.createdAt}
                  </p>
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
