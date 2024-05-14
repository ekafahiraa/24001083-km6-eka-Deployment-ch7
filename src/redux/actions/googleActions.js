import axios from "axios";
import { setUser, setError, clearError } from "../reducers/googleReducers";

export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
      {
        access_token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token } = response.data.data; // Mendapatkan token dari response data
    localStorage.setItem("token", token); // Menyimpan token di local storage
    dispatch(setUser(response.data)); // Mengatur data pengguna ke Reducers
    dispatch(clearError()); // Menghapus error ke Reducers
    navigate("/home", { state: { token: token } }); // Navigate dengan menyertakan token sebagai state
    alert("Login successful, enjoy watching!");
  } catch (error) {
    console.log(error); // Menampilkan error di konsol
    dispatch(setError("Failed to login with Google! Please try again.")); // Mengatur pesan error ke Reducers
    alert("Failed to login with Google! Please try again.");
  }
};
