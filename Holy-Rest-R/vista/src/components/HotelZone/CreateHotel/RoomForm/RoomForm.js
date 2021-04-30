import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";

import "./scss/RoomForm.scss";

export default function RoomForm() {
  const [formRoomValue, setFormRoomValue] = useState(initialRoomValue());
  const onChangeRoom = (e) => {
    setFormRoomValue({ ...formRoomValue, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
  };

  return (
    <div>
      <h2>RoomFOrm</h2>
    </div>
  );
}
function initialRoomValue() {
  return {
    TypeRoom: "",
    RoomPrice: "",
    Availability: "",
  };
}
