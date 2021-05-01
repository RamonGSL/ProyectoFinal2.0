import React, { useState, useEffect } from "react";

import "./scss/CreateHotel.scss";
import FoodForm from "./FoodForm/FoodForm";
import HotelForm from "./HotelForm/HotelForm";
import ImagesForm from "./ImagesForm/ImagesForm";
import RoomForm from "./RoomForm/RoomForm";

export default function CreateHotel() {
  const [hotelState, setHotelState] = useState(false);
  const changeStateHotel = (valueHotel) => {
    setHotelState(valueHotel);
  };
  setTimeout(() => {
    console.log(hotelState);
  }, 3000);

  return (
    <div className="Content-form">
      <HotelForm changeStateHotel={changeStateHotel} />
      {hotelState === true ? (
        <>
          <FoodForm />
          <RoomForm />
          <ImagesForm />
        </>
      ) : null}
    </div>
  );
}
