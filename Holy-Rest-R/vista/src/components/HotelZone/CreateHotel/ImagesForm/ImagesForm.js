import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import "./scss/ImagesForm.scss";

export default function ImagesForm() {
  const [formHotelImageValue, setFormHotelImageValue] = useState(
    initialHotelImageValue()
  );

  const onChangeImageHotel = (e) => {
    setFormHotelImageValue({
      ...formHotelImageValue,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
  };
  return (
    <div>
      <h2>ImagesFOrm</h2>
    </div>
  );
}
function initialHotelImageValue() {
  return {
    NameImage: "",
    Type: "",
    hotelImage: "",
  };
}
