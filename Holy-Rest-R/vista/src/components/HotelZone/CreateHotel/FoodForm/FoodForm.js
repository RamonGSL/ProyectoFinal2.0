import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size, initial } from "lodash";
import { toast } from "react-toastify";
import "./scss/FoodForm.scss";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

export default function FoodForm() {
  const [formFoodValue, setFormFoodValue] = useState(initialFoodValue());
  const [foodFormLoading, setFoodFormLoading] = useState(false);
  const allFoods = [];
  const onChangeFood = (e) => {
    setFormFoodValue({ ...formFoodValue, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
  };
  const addFood = () => {
    allFoods.push(formFoodValue);
    console.log(allFoods);
  };

  return (
    <div>
      <Form className="FormHotel" onSubmit={onSubmit} onChange={onChangeFood}>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="select"
            name="Food"
            placeholder="Food"
            defaultValue={formFoodValue.Type}
          />
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </Form.Group>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            type="number"
            name="Price"
            placeholder="Price"
            defaultValue={formFoodValue.Price}
          />
        </Form.Group>

        <Form.Group className="boxInput">
          <button onClick={() => addFood()}>
            <AddCircleOutlineRoundedIcon className="foodIcon" />
          </button>
        </Form.Group>

        <div></div>

        <Button className="buttonFoodForm" variant="primary" type="submit">
          {!foodFormLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}
function initialFoodValue() {
  return {
    Type: "",
    Price: "",
  };
}
