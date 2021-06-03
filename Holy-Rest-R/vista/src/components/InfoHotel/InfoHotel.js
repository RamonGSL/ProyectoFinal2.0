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

let arrayImages = [];
let arrayRooms = [];
let arrayFoods = [];
export default function InfoHotel(props) {
  const { show, setShow, hotel } = props;
  const [interruptor, setInterruptor] = useState(false)
  const [interruptorImages, setInterruptorImages] = useState(false);
  const [interruptorRooms, setInterruptorRooms] = useState(false);
  const [interruptorFoods, setInterruptorFoods] = useState(false);
  const [key, setKey] = useState("about");


  const returnImages = async () => {
    let totalImg = await getALLIMages();
    if (totalImg !== null) {
      for (const image of totalImg) {
        arrayImages.push(image);
      }
      setInterruptorImages(true)
    }
    return true;
  };
  const returnFoods = async () => {
    let totalFoods = await getFoodsForHotel(hotel.Id);
    if (totalFoods !== null) {
      for (const food of totalFoods) {
        arrayFoods.push(food);
      }
      setInterruptorFoods(true);
    }
    return true;
  };

  const returnRooms = async () => {
    let totalRooms = await getRoomsForHotel(hotel.Id);
    if (totalRooms !== null) {
      for (const room of totalRooms) {
        arrayRooms.push(room);
      }
      setInterruptorRooms(true);
    }
    return true;
  };

  const changeInterruptor = async () => {
    let room = await returnRooms();
    let image = returnImages();
    let food = await returnFoods();
    if(room && image && food) setInterruptor(true);
  }

  useEffect(() => {
    arrayImages = [];
    arrayRooms = [];
    arrayFoods = [];
    changeInterruptor();
  }, []);

  return (
    <>
      {interruptor === true ? (
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
      ) : null}
    </>
  );
}
