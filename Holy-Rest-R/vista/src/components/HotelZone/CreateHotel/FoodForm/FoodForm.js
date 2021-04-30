import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import "./scss/FoodForm.scss";

export default function FoodForm() {
  const [formFoodValue, setFormFoodValue] = useState(initialFoodValue());
  const onChangeFood = (e) => {
    setFormFoodValue({ ...formFoodValue, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
  };

  return (
    <div>
      <h2>FoodFOrm</h2>
    </div>
  );
}
function initialFoodValue() {
  return {
    Type: "",
    Price: "",
  };
}
