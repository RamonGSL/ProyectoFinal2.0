import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, ListGroup } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import "./scss/ImagesForm.scss";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { API_URL } from "./../../utils/constant";

var allImages = [];
export default function ImagesForm() {
  const [formHotelImage, setFormHotelImage] = useState(initialHotelImage());
  const [formHotelImageLoading, setRoomFormLoading] = useState(false);

  const [image, setImage] = useState(
    `${API_URL}/vista/src/assets/userDefault.jpg`
  );

  const addImage = () => {
    let validCount = 0;

    values(formHotelImage).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formHotelImage) < validCount) {
      toast.warning("Complete all fields");
    } else {
    }
  };
  const addFile = (e) => {
    let image = e.target.files;
    let imageConfirm;
    Array.from(image).forEach((image) => {
      let pattern = /^image/;
      if (!pattern.test(e.target.files[0].type)) {
        setImage(`${API_URL}/server/images/${formHotelImage.Image}`);
        toast.warning("The format is invalid");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        imageConfirm = reader.result;
        setFormHotelImage({ ...formHotelImage, Image: imageConfirm });
        imageConfirm = imageConfirm.split(",");
        setImage(imageConfirm);
      };
    });
  };
  const onChangeImageHotel = (e) => {
    setFormHotelImage({
      ...formHotelImage,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
  };
  return (
    <div className="FormImages">
      <Form
        className="FormHotel"
        onSubmit={onSubmit}
        onChange={onChangeImageHotel}
      >
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="file"
            name="Image"
            placeholder="Image"
            onInput={addFile}
            defaultValue={formHotelImage.Image}
          />
        </Form.Group>

        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="select"
            name="Type"
            placeholder="Type Image"
            defaultValue={formHotelImage.Type}
          >
            <option value="principal">principal</option>
            <option value="Normal">Normal</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="boxInput">
          <button onClick={addImage}>
            <AddCircleOutlineRoundedIcon className="foodIcon" />
          </button>
        </Form.Group>

        <div></div>

        <Button className="buttonFoodForm" variant="primary" type="submit">
          {!formHotelImageLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
      <ListGroup id="groupRoom"></ListGroup>
    </div>
  );
}
function initialHotelImage() {
  return {
    Type: "",
    Image: "",
  };
}
