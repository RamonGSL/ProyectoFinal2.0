import { React, useState, useEffect } from "react";

import "./scss/UserZone.scss";
import { logoutUser, datasUser } from "./../../api/user";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import { Button } from "react-bootstrap";

import ChangeForm from "./../../components/ChangeForm/ChangeForm";
import MasterZone from "./../../components/MasterZone/MasterZone";

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
    <div id="containerUserZone">
      {/* {dataUser[0].Name !== null ? <h2>{dataUser[0].Name}</h2> : null}
       */}
      <div id="containerButtons">
        <Button id="logout" onClick={logout}>
          <LockRoundedIcon />
          <span>Logout</span>
        </Button>

        <Button
          id="dataUser"
          onClick={() => {
            changeOption("dataUser");
          }}
        >
          <AccountCircleIcon />
          <span name="dataUser">change data</span>
        </Button>

        {role === "1" ? (
          <Button
            id="dataUser"
            onClick={() => {
              changeOption("hotelZone");
            }}
          >
            <SettingsRoundedIcon />
            <span name="hotelZone">Hotel Zone</span>
          </Button>
        ) : null}

        {role === "2" ? (
          <Button
            id="dataUser"
            onClick={() => {
              changeOption("masterZone");
            }}
          >
            <SettingsRoundedIcon />
            <span name="masterZone">Master Zone</span>
          </Button>
        ) : null}
      </div>

      <div id="optionSelect">
        {optionSelect === null ? (
          <div>
            <p>Default</p>
          </div>
        ) : null}
        {optionSelect === "dataUser" ? (
          <ChangeForm dataUser={dataUser} />
        ) : null}

        {optionSelect === "masterZone" ? <MasterZone /> : null}
      </div>
    </div>
  );
}
