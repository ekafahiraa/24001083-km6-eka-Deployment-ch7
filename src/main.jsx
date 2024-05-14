import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Route from "./Route.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="510075300623-ghns9ieituthiln2plirkmi3st0bdo2e.apps.googleusercontent.com">
          <Route />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
