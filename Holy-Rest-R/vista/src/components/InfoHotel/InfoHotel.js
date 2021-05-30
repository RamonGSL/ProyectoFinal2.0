import { React, useState, useEffect } from "react";
import "./scss/InfoHotel.scss";
import { Modal } from "react-bootstrap";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Banner from "./Banner/Banner";
import { getALLIMages } from "../../api/images";

var arrayImages = [];

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

  useEffect(() => {
    returnImages();
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
