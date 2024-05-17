import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { fetchAuthUser } from "./redux/actions/authActions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import backgroundImage from "./bguser.png";

export default function AuthUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Mengambil data user dari Reducers menggunakan useSelector

  useEffect(() => {
    // Mengirimkan actions untuk mengambil data pengguna
    dispatch(fetchAuthUser());
  }, [dispatch]);

  useEffect(() => {
    // Mengecek token yang ada di localStorage
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      // Menampilkan pesan kepada pengguna untuk login terlebih dahulu
      alert("Access restricted. Please log in to continue.");
      // Mengarahkan pengguna ke halaman login
      navigate("/login-user");
    }
  }, [navigate]);

  // Meng-handle button Logout
  const handleLogout = () => {
    // Menampilkan konfirmasi logout kepada pengguna
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // Menghapus token dari localStorage
      navigate("/"); // Navigasi kembali ke halaman landing page setelah logout
      alert("Logout Successful!"); // Menampilkan pesan bahwa logout berhasil
    }
  };

  // Meng-handle button Favorite Movies
  const handleFavoriteMovie = () => {
    // Navigasi ke halaman film favorit
    navigate("/favorite-movie");
  };

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
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <div className="max-w-[450px] w-full mt-20 mb-10 mr-14">
          <div className="bg-[#B22222] w-full text-center py-3 rounded-t-2xl mb-[-1px]">
            <h2 className="text-3xl text-white font-semibold">User Details</h2>
          </div>
          <div className="bg-white rounded-b-2xl shadow-lg py-6 px-8">
            <div className="flex flex-col justify-center items-center">
              {user && (
                <>
                  <div className="text-center mb-7 flex flex-col items-center">
                    <BsPersonCircle className="w-20 h-20 mb-4" />
                    <p className="text-2xl text-[#2C2C2C] font-bold">
                      {user.name}
                    </p>
                  </div>

                  <div className="text-left text-[#2C2C2C] w-full mb-5">
                    <p className="font-medium text-base mb-1">
                      <span className="mr-2 font-semibold">Name:</span>
                      {user.name}
                    </p>
                    <p className="font-medium text-base mb-1">
                      <span className="mr-2 font-semibold">Email:</span>
                      {user.email}
                    </p>
                    <p className="font-medium text-base mb-1">
                      <span className="mr-2 font-semibold">ID:</span>
                      {user.id}
                    </p>
                    <p className="font-medium text-base mb-1">
                      <span className="mr-2 font-semibold">Joined:</span>
                      {user.createdAt}
                    </p>
                    <p className="font-medium text-base">
                      <span className="mr-2 font-semibold">Type:</span>
                      {user.type}
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={handleFavoriteMovie}
                      className="bg-blue-600 text-white font-medium py-1.5 px-5 rounded-lg shadow-lg hover:bg-blue-900 transition duration-300 w-1/2 mr-2 flex items-center justify-center"
                    >
                      <MdFavorite className="mr-2 w-5 h-5" />
                      Favorite Movies
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-[#B22222] text-white font-medium py-1.5 px-5 rounded-lg shadow-lg hover:bg-[#8B0000] transition duration-300 w-1/2 ml-2 flex items-center justify-center"
                    >
                      <TbLogout2 className="mr-2 w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
