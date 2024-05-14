import axios from "axios";
import { setUser, setError, clearError } from "../reducers/loginReducers";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const responseLogin = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (responseLogin.status === 200) {
      dispatch(setUser(responseLogin.data)); // Mengatur setUser ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
      localStorage.setItem("token", responseLogin.data.data.token); // Menyimpan token user di local storage
      console.log("Data: ", responseLogin.data); // Menampilkan data responseLogin di konsol
      navigate("/home");
      alert(`Login successful, enjoy watching!`);
    }
    console.log("Response Login: ", responseLogin);
  } catch (error) {
    console.log(error);
    dispatch(setError("Invalid username or password! Please try again."));
    alert("Invalid username or password! Please try again.");
  }
};
