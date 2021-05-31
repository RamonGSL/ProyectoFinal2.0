import { React, useEffect } from "react";
import "./scss/InfoHotel.scss";
import { Modal } from "react-bootstrap";
import Banner from "./Banner/Banner";
import Foods from "./Foods/Foods";
import Rooms from "./Rooms/Rooms";
import { getALLIMages } from "../../api/images";
import { getFoodsForHotel } from "./../../api/food";
import { getRoomsForHotel } from "../../api/room";
var arrayImages = [];
var arrayFoods = [];
var arrayRooms = [];

export default function InfoHotel(props) {
  const { show, setShow, hotel } = props;

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
      console.log(totalFoods);
      totalFoods.forEach((food) => {
        arrayFoods.push(food);
      });
      console.log(arrayFoods);
    }
  };

  const returnRooms = async () => {
    let totalRooms = await getRoomsForHotel(hotel.Id);
    if (totalRooms !== null) {
      totalRooms.forEach((room) => {
        arrayRooms.push(room);
      });
      console.log(arrayFoods);
    }
  };

  useEffect(() => {
    returnImages();
    returnFoods();
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
            <Foods foods={arrayFoods} />
            <Rooms rooms={arrayRooms} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
