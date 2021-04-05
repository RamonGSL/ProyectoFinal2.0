import React, { useState, useEffect } from "react";
import SignInSingUp from "./views/SignInSingUp/index";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context";
import { isUserLoged } from "./utils/services";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(isUserLoged());
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {user ? <h1> Estas logeado</h1> : <SignInSingUp />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
