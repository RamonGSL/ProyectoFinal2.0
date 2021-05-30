import { React, useState } from "react";
import "./scss/InfoHotel.scss";
import { Modal } from "react-bootstrap";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
export default function InfoHotel(props) {
  const { show, setShow, hotel } = props;
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
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>{hotel}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
