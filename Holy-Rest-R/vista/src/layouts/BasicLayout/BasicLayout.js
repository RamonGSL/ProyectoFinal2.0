import React from "react";
import Routing from "./../../routes/Routing";
import "./scss/BasicLayout.scss";
import { ToastContainer } from "react-toastify";

export default function BasicLayout() {
  return (
    <div className="basic-layout">
      <Routing />
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
    </div>
  );
}
