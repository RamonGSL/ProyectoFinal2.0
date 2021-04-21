import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

import ColorMode from "./ColorMode/ColorMode";
import { isUserLoged } from "./../../api/user";

import "./scss/Menu.scss";

export default function Menu() {
  const [user, setUser] = useState(isUserLoged());
  console.log(user);

  return (
    <div className="menu">
      <div className="menu__routes">
        {user ? (
          <Link to="/user-zone">
            <AccountCircleRoundedIcon />
            <span>User Zone</span>
          </Link>
        ) : (
          <Link to="/signInUp">
            <AccountCircleRoundedIcon />
            <span>Sign In Up</span>
          </Link>
        )}

        <Link to="/hotels">
          <ApartmentRoundedIcon />
          <span>Hotels</span>
        </Link>

        <Link to="/">
          <HomeRoundedIcon />
          <span>Home</span>
        </Link>

        <ColorMode />
      </div>
    </div>
  );
}
