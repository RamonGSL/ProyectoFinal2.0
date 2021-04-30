import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import "./scss/HotelForm.scss";

export default function HotelForm(props) {
  const setHotel = (valueHotel) => {
    props.changeStateHotel(valueHotel);
  };

  const [formHotelValue, setFormHotelValue] = useState(initialHotelValue());
  const [hotelFormLoading, setHotelFormLoading] = useState(false);

  const onChangeHotel = (e) => {
    setFormHotelValue({ ...formHotelValue, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
    console.log(formHotelValue);
  };

  return (
    <div>
      <h2 className="hotelFormTitle">Create Your Hotel</h2>
      <Form className="FormHotel" onSubmit={onSubmit} onChange={onChangeHotel}>
        <Form.Group className="boxInput">
          <Form.Control
            type="text"
            name="HotelName"
            placeholder="The name of your hotel"
            defaultValue={formHotelValue.HotelName}
          />
        </Form.Group>
        <Form.Group className="boxInput">
          <Form.Control
            type="text"
            name="Description"
            placeholder="The Description of your hotel"
            defaultValue={formHotelValue.Description}
          />
        </Form.Group>
        <Form.Group className="boxInput">
          <Form.Control
            type="phone"
            name="Phone"
            placeholder="The phone of your hotel"
            defaultValue={formHotelValue.HotelName}
          />
        </Form.Group>
        <Button className="buttonHotelForm" variant="primary" type="submit">
          {!hotelFormLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}
function initialHotelValue() {
  return {
    HotelName: "",
    Location: "",
    Description: "",
    Phone: "",
    Terms: "",
  };
}
