import { React, useEffect, useState } from "react";
import "./scss/InfoHotel.scss";
import { Modal } from "react-bootstrap";
import Banner from "./Banner/Banner";
import Foods from "./Foods/Foods";
import Rooms from "./Rooms/Rooms";
import { getALLIMages } from "../../api/images";
import { getFoodsForHotel } from "./../../api/food";
import { getRoomsForHotel } from "../../api/room";
import { Tabs, Tab } from "react-bootstrap";

var arrayImages = [];
var arrayFoods = [];
var arrayRooms = [];

export default function InfoHotel(props) {
  const { show, setShow, hotel } = props;
  const [key, setKey] = useState("about");
  const returnImages = async () => {
    let totalImg = await getALLIMages();
    totalImg.forEach((img) => {
      if (img.IdHotel === hotel.Id) {
        arrayImages.push(img);
      }
    });
  };

  const returnFoods = async () => {
    let totalFoods = await getFoodsForHotel(hotel.Id);
    if (totalFoods !== null) {
      totalFoods.forEach((food) => {
        arrayFoods.push(food);
      });
    }
  };

  const returnRooms = async () => {
    let totalRooms = await getRoomsForHotel(hotel.Id);
    if (totalRooms !== null) {
      totalRooms.forEach((room) => {
        arrayRooms.push(room);
      });
    }
  };

  useEffect(() => {
    arrayFoods = [];
    arrayImages = [];
    arrayImages = [];
    returnImages();
    returnFoods();
    returnRooms();
  }, []);

  return (
    <>
      <Modal
        className="basic-modal"
        centered
        size="lg"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>{hotel.HotelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Banner images={arrayImages} />
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        
        <Tab eventKey="Foods" title="Foods">
        <Foods foods={arrayFoods} />
        </Tab>
        <Tab eventKey="Rooms" title="Rooms">
        <Rooms rooms={arrayRooms} />
        </Tab>
      </Tabs>
            
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
