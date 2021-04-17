import React from "react";
import Routing from "./../../routes/Routing";
import "./scss/BasicLayout.scss";
import Menu from "./../../components/Menu/Menu";

export default function BasicLayout() {
  /*   const { className, children } = props;
  console.log(props);
  console.log(children); */
  return (
    <div className="basic-layout">
      {/*  <div className="basic-layout__menu"></div> */}
      {/*  <div className="basic-layout__content">
        <Routing />
      </div> */}
      <Routing />
    </div>
  );
}
