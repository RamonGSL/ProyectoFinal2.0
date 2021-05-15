import { React, useState, useEffect } from "react";
import "./scss/HotelZone.scss";
import { comproveAdmin } from "./../../api/manage";
import BasicModal from "./../Modal/BasicModal/BasicModal";
import { Button } from "react-bootstrap";
import { Tabs, Tab, Carousel } from "react-bootstrap";
import CreateHotel from "./CreateHotel/CreateHotel";
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
      {/*  {hotelDatas === null ? (
        <Button
          variant="primary"
          onClick={() => openModal(<CreateHotel setShowModal={setShowModal} />)}
        >
          CreateHotel
        </Button>
      ) : null}

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal> */}

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Hotel" title="Hotel">
          <CreateHotel />
        </Tab>
        <Tab eventKey="Analytics" title="Analytics">
          <p>Analytics</p>
        </Tab>
      </Tabs>

      {/*  {hotelDatas !== null ? (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="HotelSettings" title="HotelSettings"></Tab>
          <Tab eventKey="Hotels" title="Hotels">
            <p>Estadisticas</p>
          </Tab>
        </Tabs>
      ) : null} */}
    </div>
  );
}
