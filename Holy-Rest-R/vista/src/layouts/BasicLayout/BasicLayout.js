import React from "react";

import "./scss/BasicLayout.scss";
import Menu from "./../../components/Menu/Menu";

export default function BasicLayout(props) {
  const { className, children } = props;
  return (
    <div className={`basic-layout ${className}`}>
      <div className="basic-layout__menu">
        <Menu />
      </div>
      <div className="basic-layout__content">{children}</div>
    </div>
  );
}
