import { React, useState, useEffect } from "react";
import FoodForm from "../FoodForm/FoodForm";
import HotelForm from "../HotelForm/HotelForm";
import ImagesForm from "../ImagesForm/ImagesForm";
import RoomForm from "../RoomForm/RoomForm";
import { Modal } from "react-bootstrap";
import "./scss/componentsHotel.scss";
export default function ComponentsHotel(props) {
  const { open, close } = props;
  const [show, setShow] = useState(null);
  const [openState, setOpenState] = useState(null);
  useEffect(() => {
    setShow(true);
    setOpenState(open);
  }, []);

  return (
    <div>
      <Modal
        className="basic-modal modalForm"
        centered
        size="lg"
        show={show}
        onHide={() => {
          close(null);
          setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {open === 1 ? <HotelForm /> : null}
          {open === 2 ? <FoodForm /> : null}
          {open === 3 ? <ImagesForm /> : null}
          {open === 4 ? <RoomForm /> : null}
        </Modal.Body>
      </Modal>
    </div>
  );
}
