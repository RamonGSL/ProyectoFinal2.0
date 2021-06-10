import { React, useState, useEffect } from "react";
import "./scss/HotelZone.scss";
import { comproveAdmin } from "./../../api/manage";
import BasicModal from "./../Modal/BasicModal/BasicModal";
import { Button } from "react-bootstrap";
import { Tabs, Tab, Carousel } from "react-bootstrap";
import CreateHotel from "./CreateHotel/CreateHotel";
import Analytics from "./Analytics/Analytics";

export default function HotelZone() {
  const [key, setKey] = useState("about");

  const [hotelDatas, setHotelDatas] = useState(null);

  const updateHotelState = async () => {
    let hotelDatas = await comproveAdmin();
    setHotelDatas(hotelDatas);
  };

  useEffect(() => {
    updateHotelState();
  }, []);

  return (
    <div className="containerHotelZone">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Hotel" title="Hotel">
          <CreateHotel />
        </Tab>
        <Tab eventKey="Analytics" title="Analytics">
          {hotelDatas !== null ? <Analytics idHotel={hotelDatas} /> : null}
        </Tab>
      </Tabs>
    </div>
  );
}
