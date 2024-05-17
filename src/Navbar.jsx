import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSolidUserDetail } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // State untuk mengontrol tampilan dropdown
  const [menuOpen, setMenuOpen] = useState(false); // State untuk mengontrol tampilan menu
  const [userData, setUserData] = useState(null); // State untuk menyimpan data pengguna
  const isLoggedIn = localStorage.getItem("token"); // Memeriksa apakah token ada di localStorage untuk menentukan status login

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Mengubah state untuk menampilkan atau menyembunyikan dropdown
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Mengubah state untuk menampilkan atau menyembunyikan menu
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?"); // Menampilkan konfirmasi logout kepada pengguna
    if (confirmLogout) {
      localStorage.removeItem("token"); // Menghapus token dari localStorage
      navigate("/"); // Navigasi kembali ke halaman landing page setelah logout
      alert("Logout Successful!"); // Menampilkan pesan bahwa logout berhasil
    }
  };

  const handleUnauthorizedClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert("You need to Sign In first!"); // Menampilkan pesan bahwa pengguna perlu login terlebih dahulu
    }
  };

  const homeLink = isLoggedIn ? "/home" : "/"; // Menentukan link home berdasarkan status login

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Mengambil data pengguna dari API
        const userData = response.data; // Menyimpan data pengguna dari response
        console.log("User profile: ", userData);
        setUserData(userData); // Menyimpan data pengguna
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Token expired");
        } else {
          alert("An error occurred while fetching user data");
          console.error("Error: ", error);
        }
      }
    }
    if (isLoggedIn) {
      fetchData(); // Mengambil data pengguna jika pengguna telah login
    }
  }, []); // Menjalankan ketika isLoggedIn berubah

  return (
    <nav className="py-4 px-6 top-0 w-full bg-[#B22222] fixed z-10">
      <div className="container flex justify-between items-center">
        <Link
          to={homeLink}
          className="flex items-center text-4xl font-semibold text-white"
        >
          <BiCameraMovie className="w-35 h-35 mr-2 text-white" />
          <span className="italic">Streamflix</span>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? (
              <FiX className="w-8 h-8" />
            ) : (
              <FiMenu className="w-8 h-8" />
            )}
          </button>
        </div>
        <div className={`hidden md:flex items-center gap-2 relative`}>
          <div className="flex gap-4">
            <Link
              to="/search-movie"
              className="border-2 border-white rounded-xl px-6 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold flex items-center"
              onClick={handleUnauthorizedClick}
            >
              <FaSearch className="mr-3" />
              Search
            </Link>
            <Link
              to="/upcoming-movie"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
              onClick={handleUnauthorizedClick}
            >
              Upcoming
            </Link>
            <Link
              to="/top-rated-movie"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
              onClick={handleUnauthorizedClick}
            >
              Top Rated
            </Link>
            <a
              href="#footer"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
            >
              Contact Us
            </a>
            {isLoggedIn ? (
              <div className="relative flex items-center">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-2 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold"
                >
                  <IoPersonCircleOutline className="w-8 h-8 ease-in-out transform hover:scale-110" />
                </button>

                {showDropdown && (
                  <div className="absolute top-10 right-0">
                    <div className="bg-white rounded-xl shadow-xl flex-col">
                      <Link
                        to="/auth-user"
                        className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                      >
                        <BiSolidUserDetail className="w-6 h-6 mr-2" />
                        <span>Details</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                      >
                        <TbLogout2 className="w-6 h-6 mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login-user"
                className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        <div
          className={`flex-col ${
            menuOpen ? "flex" : "hidden"
          } md:hidden items-center bg-[#B22222] w-full mt-4`}
        >
          <Link
            to="/search-movie"
            className="border-2 border-white rounded-xl px-6 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold flex items-center"
            onClick={handleUnauthorizedClick}
          >
            <FaSearch className="mr-3" />
            Search
          </Link>
          <Link
            to="/upcoming-movie"
            className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
            onClick={handleUnauthorizedClick}
          >
            Upcoming
          </Link>
          <Link
            to="/top-rated-movie"
            className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
            onClick={handleUnauthorizedClick}
          >
            Top Rated
          </Link>
          <a
            href="#footer"
            className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <div className="flex flexcol items-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center px-2 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold"
              >
                <IoPersonCircleOutline className="w-8 h-8 ease-in-out transform hover:scale-125" />
              </button>

              {showDropdown && (
                <div className="flex flex-col items-center bg-white rounded-xl shadow-xl mt-2">
                  <Link
                    to="/auth-user"
                    className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                  >
                    <BiSolidUserDetail className="w-6 h-6 mr-2" />
                    <span>Details</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                  >
                    <TbLogout2 className="w-6 h-6 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login-user"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
