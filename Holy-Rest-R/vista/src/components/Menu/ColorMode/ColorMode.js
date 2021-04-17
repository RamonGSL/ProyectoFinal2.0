import React, { useState, useEffect } from "react";
import "./scss/ColorMode.scss";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness2RoundedIcon from "@material-ui/icons/Brightness2Rounded";

import { whatColorStorage, setColorStorage } from "./../../../api/web";

export default function ColorMode() {
  const [webColor, setWebColor] = useState(whatColorStorage);

  const comproveClass = () => {
    let colorMode = document.getElementById("colorMode");
    let response = webColor;

    if (response === "light") {
      colorMode.classList.add("active");
    } else {
      colorMode.classList.remove("active");
    }
  };

  const btnColor = () => {
    let colorMode = document.getElementById("colorMode");
    if (webColor === "") {
      setWebColor("light");
      colorMode.classList.add("active");
    } else if (webColor === "light") {
      colorMode.classList.remove("active");
      setWebColor("");
    } else {
      setWebColor("light");
      colorMode.classList.add("active");
    }
  };

  useEffect(() => {
    comproveClass();
  }, []);

  useEffect(() => {
    setColorStorage(webColor);
    if (webColor === "light") {
      document.documentElement.style.setProperty("--primary-dark", "#456990");
      document.documentElement.style.setProperty("--primary-light", "#fff");
      document.documentElement.style.setProperty(
        "--background-dark",
        "#456990"
      );
      document.documentElement.style.setProperty("--primary", "#fff");
      document.documentElement.style.setProperty("--font-light", "black");
    } else {
      document.documentElement.style.setProperty("--primary-dark", "#001d3d");
      document.documentElement.style.setProperty(
        "--background-dark",
        "#001d3d"
      );
      document.documentElement.style.setProperty("--primary", "#003566");
      document.documentElement.style.setProperty("--font-light", "#fff");
      document.documentElement.style.setProperty("--primary-light", "#cae9ff");
    }
  }, [webColor]);

  return (
    <button id="colorMode" className="colorMode" onClick={btnColor}>
      <span>
        <Brightness7RoundedIcon />
      </span>
      <span>
        <Brightness2RoundedIcon />
      </span>
    </button>
  );
}
