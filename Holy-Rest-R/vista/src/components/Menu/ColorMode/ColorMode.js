import React, { useState, useEffect } from "react";
import "./scss/ColorMode.scss";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness2RoundedIcon from "@material-ui/icons/Brightness2Rounded";

import { whatColorStorage, setColorStorage } from "./../../../api/web";

export default function ColorMode() {
  const [webColor, setWebColor] = useState(whatColorStorage);

  const btnColor = () => {
    if (webColor === "") {
      setWebColor("light");
    } else if (webColor === "light") {
      setWebColor("");
    } else {
      setWebColor("light");
    }
  };

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
      document.documentElement.style.setProperty("--primary-dark", "#001d3");
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
    <button className="colorMode" onClick={btnColor}>
      <span>
        <Brightness7RoundedIcon />
      </span>
      <span>
        <Brightness2RoundedIcon />
      </span>
    </button>
  );
}
