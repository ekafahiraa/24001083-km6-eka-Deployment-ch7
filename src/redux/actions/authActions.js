import axios from "axios";
import { setUser } from "../reducers/authReducers";

export const fetchAuthUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token dari local storage
    if (!token) {
      throw new Error("Token not found in local storage"); // Alert jika token tidak ada
    }

    // Mengambil data pengguna
    const response = await axios.get(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menggunakan token sebagai authorization
        },
      }
    );
    const user = response.data.data; // Mendapatkan data pengguna dari response
    console.log("Data pengguna: ", user); // Menampilkan data pengguna di konsol
    dispatch(setUser(user)); // Mengatur data pengguna ke Reducers
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Failed to fetch user data."); // Menampilkan pesan error jika gagal mengambil data pengguna
    } else {
      alert("Error fetching user details."); // Menampilkan pesan error jika terjadi kesalahan lain
      console.error("Error: ", error);
    }
  }
};
