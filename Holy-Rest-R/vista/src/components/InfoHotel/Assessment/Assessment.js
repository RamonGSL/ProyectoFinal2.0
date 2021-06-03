import React from "react";
import { Modal } from "react-bootstrap";

export default function Assessment(props) {
  const { show, setShow, hotel } = props;
  return (
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
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
