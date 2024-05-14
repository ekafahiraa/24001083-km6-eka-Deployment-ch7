import axios from "axios";
import { setError, clearError } from "../reducers/registerReducers";

export const registerUser =
  (email, name, password, navigate) => async (dispatch) => {
    try {
      const responseRegister = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseRegister.status === 201) {
        dispatch(clearError()); // Menghapus error ke Reducers
        localStorage.setItem("token", responseRegister.data.data.token); // Menyimpan token pengguna di local storage
        console.log("Data: ", responseRegister.data); // Menampilkan data response di konsol
        alert("Registration successful! Please login to continue.");
        navigate("/login-user");
      }
      console.log("Response Register", responseRegister); // Menampilkan response registrasi di konsol
    } catch (error) {
      console.error("Error registering user:", error); // Menampilkan error di konsol
      dispatch(
        setError(
          "Registration failed! This email might already be registered. Please try again."
        )
      ); // Actions untuk mengatur pesan error ke Reducers
      alert(
        "Registration failed. This email might already be registered. Please try again."
      );
    }
  };
