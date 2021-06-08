import React, { useState, useEffect } from "react";
import { comproveAdmin } from "./../../../api/manage";
import "./scss/CreateHotel.scss";
import FoodForm from "./FoodForm/FoodForm";
import HotelForm from "./HotelForm/HotelForm";
import ImagesForm from "./ImagesForm/ImagesForm";
import RoomForm from "./RoomForm/RoomForm";

export default function CreateHotel() {
  const [hotelState, setHotelState] = useState(false);

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
    <div className="Content-form">
      <HotelForm />
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
