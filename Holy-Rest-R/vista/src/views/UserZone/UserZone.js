import { React, useState, useEffect } from "react";

import "./scss/UserZone.scss";
import { logoutUser, datasUser } from "./../../api/user";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import { Button } from "react-bootstrap";

import ChangeForm from "./../../components/ChangeForm/ChangeForm";
import MasterZone from "./../../components/MasterZone/MasterZone";
import HotelZone from "./../../components/HotelZone/HotelZone";
export default function UserZone() {
  const [dataUser, setDataUser] = useState(null);
  const [role, setRole] = useState(null);
  const [optionSelect, setOptionSelect] = useState(null);

  const returnDatas = async () => {
    let response = await datasUser();
    if(response !== null){
      setRole(response[0].RoleUser);
      setDataUser(response[0]);
    }
    
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
    <>
      {dataUser !== null ? (
        <div className="userName">
          <h2 className="nameUserTitle1">{dataUser.Name}</h2>
          <h3 className="nameUserTitle"> This is the zone of your user</h3>
        </div>
      ) : null}
      {dataUser !== null ? (
      <div id="containerUserZone">
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
          {optionSelect === null ? <div></div> : null}
          {optionSelect === "dataUser" ? (
            <ChangeForm dataUser={dataUser} />
          ) : null}

          {optionSelect === "masterZone" ? <MasterZone /> : null}
          {optionSelect === "hotelZone" ? <HotelZone /> : null}
        </div>
      </div>
      ):null}
    </>
  );
}
