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
import { mediaPuntuation } from "../../api/assessment";

let arrayImages = [];
let arrayRooms = [];
let arrayFoods = [];

export default function InfoHotel(props) {
  const { show, setShow, hotel } = props;
  const [interruptor, setInterruptor] = useState(false);
  const [interruptorImages, setInterruptorImages] = useState(false);
  const [interruptorRooms, setInterruptorRooms] = useState(false);
  const [interruptorFoods, setInterruptorFoods] = useState(false);
  const [key, setKey] = useState("about");
  const [totalPuntuation, setTotalPuntuation] = useState("");

  const returnImages = async () => {
    let totalImg = await getALLIMages();
    if (totalImg !== null) {
      for (const image of totalImg) {
        arrayImages.push(image);
      }
      setInterruptorImages(true);
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
    if (room && image && food) setInterruptor(true);
  };

  const showMediaPuntuation = async () => {
    let media = await mediaPuntuation(hotel.Id);
    setTotalPuntuation(media);
  };

  useEffect(() => {
    arrayImages = [];
    arrayRooms = [];
    arrayFoods = [];
    changeInterruptor();
    showMediaPuntuation();
  }, []);

  const [imagesA, setImagesA] = useState(null);

  useEffect(() => {
    let newArray = [];
    for (const image of arrayImages) {
      if (image.IdHotel === hotel.Id) {
        newArray.push(image);
      }
    }
    setImagesA(newArray);
  }, [interruptorImages]);

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
            <Modal.Title>
              <p className="hotelNameInfo">{hotel.HotelName}</p>
              <p className="totalPuntuation">
                The average score for this hotel is
              </p>
              <p className="totalScore">{totalPuntuation}</p>
              <p className="hotelNameInfo">{hotel.Location}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Banner images={arrayImages} hotel={hotel.Id} />
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
