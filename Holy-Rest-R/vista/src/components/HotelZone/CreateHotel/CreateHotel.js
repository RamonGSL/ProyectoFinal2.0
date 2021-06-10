import React, { useState, useEffect } from "react";
import { comproveAdmin } from "./../../../api/manage";
import "./scss/CreateHotel.scss";
import { Button } from "react-bootstrap";

import ComponentsHotel from "./ComponentsHotel/ComponentsHotel";

export default function CreateHotel() {
  const [hotelState, setHotelState] = useState(false);
  const [buttonSelect, setButtonSelect] = useState(null);

  const existHotel = async () => {
    let hotel = await comproveAdmin();
    if (hotel !== null) {
      setHotelState(true);
    } else {
      setHotelState(false);
    }
  };

  useEffect(() => {
    existHotel();
  }, []);

  return (
    <div className="containerBtnForms">
      <Button
        className="buttonSelectForm"
        onClick={() => {
          setButtonSelect(1);
        }}
      >
        Main information
      </Button>
      {hotelState === true ? (
        <>
          <Button
            className="buttonSelectForm"
            onClick={() => {
              setButtonSelect(2);
            }}
          >
            Food
          </Button>

          <Button
            className="buttonSelectForm"
            onClick={() => {
              setButtonSelect(3);
            }}
          >
            Images
          </Button>
          <Button
            className="buttonSelectForm"
            onClick={() => {
              setButtonSelect(4);
            }}
          >
            Rooms
          </Button>
        </>
      ) : null}
      {buttonSelect !== null ? (
        <ComponentsHotel open={buttonSelect} close={setButtonSelect} />
      ) : null}
    </div>
  );
}
