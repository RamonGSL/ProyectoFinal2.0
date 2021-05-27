import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, ListGroup } from "react-bootstrap";
import axios from "axios";
import { values, size, initial, map, random } from "lodash";
import { toast } from "react-toastify";
import "./scss/FoodForm.scss";
import { API_URL } from "./../../../../utils/constant";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { createFood, getFoods } from "./../../../../api/food";

var allFoods = [];

export default function FoodForm() {
  const [formFoodValue, setFormFoodValue] = useState(initialFoodValue());
  const [foodFormLoading, setFoodFormLoading] = useState(false);

  useEffect(() => {
    initialiceFoods();
  }, []);

  const initialiceFoods = async () => {
    let obj = null;
    let result = await getFoods();
    if (result !== null) {
      await result.forEach((element) => {
        obj = {
          Food: element.Type,
          Price: element.Price,
        };
        if (obj !== null) {
          allFoods.push(obj);
        }
      });
      foodTable();
    }
  };

  const addFood = () => {
    let validCount = 0;

    values(formFoodValue).some((value) => {
      value && validCount++;
      return null;
    });
    if (size(formFoodValue) !== validCount) {
      toast.warning("Complete all fields");
    } else {
      if (formFoodValue.Price > 0) {
        allFoods.push(formFoodValue);
        foodTable();
      } else {
        toast.warning("Please select real price");
      }
    }
  };

  const deleteFood = (id) => {
    let newArray = [];
    document.getElementById(id).remove();
    allFoods.forEach((element) => {
      if (element.Id !== id) {
        newArray.push(element);
      }
    });
    allFoods = newArray;
    console.log(allFoods);
  };

  const foodTable = () => {
    let container = document.getElementById("groupFood");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    allFoods.forEach((element, i) => {
      element.Id = i;
      let node = document.createElement("DIV");
      node.setAttribute("id", i);
      node.classList.add("list-group-item");
      let span = document.createElement("SPAN");
      let textnode = document.createTextNode(
        element.Food + " " + element.Price + "€"
      );
      let button = document.createElement("button");
      button.addEventListener("click", () => {
        deleteFood(i);
      });

      let imagen = document.createElement("img");
      let urlDelete = `${API_URL}/vista/src/assets/delete.svg`;
      imagen.setAttribute("src", urlDelete);

      span.appendChild(textnode);
      button.appendChild(imagen);
      node.appendChild(span);
      node.appendChild(button);
      document.getElementById("groupFood").appendChild(node);
    });
    //setFormFoodValue(initialFoodValue());
    delete formFoodValue.Id;
  };

  const onChangeFood = (e) => {
    setFormFoodValue({ ...formFoodValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (allFoods.length === 0) {
      toast.warning("please select some food");
    } else {
      try {
        let result = await createFood(allFoods);
        if (result === null) {
          toast.error("Error in server, please try later");
        } else {
          toast.success(result);
          setTimeout(() => {
            //window.location.href = "/user-zone";
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="FormFood">
      <Form className="FormHotel" onSubmit={onSubmit} onChange={onChangeFood}>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="select"
            name="Food"
            placeholder="Food"
            defaultValue={formFoodValue.Type}
          >
            <option>Default</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </Form.Control>
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
          <button type="button" onClick={addFood}>
            <AddCircleOutlineRoundedIcon className="foodIcon" />
          </button>
        </Form.Group>

        <div></div>

        <Button className="buttonFoodForm" variant="primary" type="submit">
          {!foodFormLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
      <ListGroup id="groupFood"></ListGroup>
    </div>
  );
}
function initialFoodValue() {
  return {
    Food: "",
    Price: "",
  };
}
