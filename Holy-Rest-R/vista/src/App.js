import React, { useState, useEffect } from "react";
import SignInSingUp from "./views/SignInSingUp/index";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context";
import { isUserLoged } from "./utils/services";
import Routing from "./routes/Routing";
import BasicLayout from "./layouts/BasicLayout/BasicLayout";

export default function App() {
  //Estados del Usuario para el inicio de sesión
  const [user, setUser] = useState(null);
  const [loadUser, setloadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  /*
  useEffect(() => {
    setUser(isUserLoged());
    setRefreshCheckLogin(false);
    setloadUser(true);
  }, [refreshCheckLogin]);
  */
  //if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {/*   {user ? (
        <Routing />
      ) : (
        <>
          <Routing />
        </>
      )} */}
      <BasicLayout>
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
      </BasicLayout>
    </AuthContext.Provider>
  );
}
