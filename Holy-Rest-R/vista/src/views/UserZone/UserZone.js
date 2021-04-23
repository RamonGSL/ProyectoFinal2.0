import { React, useState, useEffect } from "react";

import "./scss/UserZone.scss";
import { logoutUser, datasUser } from "./../../api/user";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import ChangeForm from "./../../components/ChangeForm/ChangeForm";

export default function UserZone() {
  const [dataUser, setDataUser] = useState(null);
  const [role, setRole] = useState(null);
  const [optionSelect, setOptionSelect] = useState(null);

  const returnDatas = async () => {
    let response = await datasUser();
    setRole(response[0].RoleUser);
    setDataUser(response[0]);
  };

  useEffect(() => {
    returnDatas();
  }, []);

  const logout = () => {
    logoutUser();
  };

  const changeOption = (info) => {
    setOptionSelect(info);
  };

  return (
    <div>
      <div>
        <h2>User Zone</h2>
        <button id="logout" onClick={logout}>
          <LockRoundedIcon />
          <span>Logout</span>
        </button>

        <button
          id="dataUser"
          onClick={() => {
            changeOption("dataUser");
          }}
        >
          <AccountCircleIcon />
          <span name="dataUser">change data</span>
        </button>

        {role === "1" ? (
          <button
            id="dataUser"
            onClick={() => {
              changeOption("hotelZone");
            }}
          >
            <SettingsRoundedIcon />
            <span name="hotelZone">Hotel Zone</span>
          </button>
        ) : null}

        {role === "2" ? (
          <button
            id="dataUser"
            onClick={() => {
              changeOption("masterZone");
            }}
          >
            <SettingsRoundedIcon />
            <span name="masterZone">Master Zone</span>
          </button>
        ) : null}
      </div>

      <div>
        {optionSelect === null ? (
          <div>
            <p>Default</p>
          </div>
        ) : null}
        {optionSelect === "dataUser" ? (
          <ChangeForm dataUser={dataUser} />
        ) : null}
      </div>
    </div>
  );
}
