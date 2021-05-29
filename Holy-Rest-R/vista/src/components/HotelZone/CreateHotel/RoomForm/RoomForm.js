import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, ListGroup } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import "./scss/RoomForm.scss";
import { API_URL } from "./../../../../utils/constant";
import { createRoom, getRooms } from "./../../../../api/room";

var allRooms = [];

export default function RoomForm() {
  const [formRoomValue, setFormRoomValue] = useState(initialRoomValue());
  const [foodRoomLoading, setRoomFormLoading] = useState(false);

  useEffect(() => {
    initialiceRooms();
  }, [])

  const initialiceRooms  = async () => {
    let obj = null;
    let result = await getRooms();
    if(result!== null){
      await result.forEach(element => {
        obj = {
          Room: element.TypeRoom,
          Price: element.RoomPrice
        }
        if(obj !== null){
          allRooms.push(obj);
        }      
      });
      roomTable();
    }

  };

  const addRoom = () => {
    let validCount = 0;

    values(formRoomValue).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formRoomValue) !== validCount) {
      toast.warning("Complete all fields");
    } else {
      if (formRoomValue.Price > 0) {
        allRooms.push(formRoomValue);
        roomTable();
      } else {
        toast.warning("Please select real price");
      }
    }
  };

  const deleteRoom = (id) => {
    let newArray = [];
    document.getElementById(id).remove();
    allRooms.forEach((element) => {
      if (element.Id !== id) {
        newArray.push(element);
      }
    });
    allRooms = newArray;
    console.log(allRooms);
  };

  const roomTable = () => {
    let container = document.getElementById("groupRoom");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    let number = 0;
    allRooms.forEach((element, i) => {
      element.Id = number.toString();
      let node = document.createElement("DIV");
      node.setAttribute("id", i);
      node.classList.add("list-group-item");
      let span = document.createElement("SPAN");
      let textnode = document.createTextNode(
        element.Room + " " + element.Price + "€"
      );
      let button = document.createElement("button");
      button.addEventListener("click", () => {
        deleteRoom(number.toString());
      });

      let imagen = document.createElement("img");
      let urlDelete = `${API_URL}/vista/src/assets/delete.svg`;
      imagen.setAttribute("src", urlDelete);

      span.appendChild(textnode);
      button.appendChild(imagen);
      node.appendChild(span);
      node.appendChild(button);
      document.getElementById("groupRoom").appendChild(node);
      number++;
    });
    //setFormRoomValue(initialRoomValue());
    delete formRoomValue.Id;
  };

  const onChangeRoom = (e) => {
    setFormRoomValue({ ...formRoomValue, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (allRooms.length === 0) {
      toast.warning("please select some food");
    } else {
      try {
        let result = await createRoom(allRooms);
        if(result === null){
          toast.error("Error in server, please try later")
        }else{
          toast.success(result);
           setTimeout(() => {
           window.location.href = "/user-zone";
         }, 1000); 
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  return (
    <div className="FormRoom">
      <Form className="FormHotel" onSubmit={onSubmit} onChange={onChangeRoom}>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="select"
            name="Room"
            placeholder="Name Room"
            defaultValue={formRoomValue.Room}
          >
            <option>Default</option>
            <option value="singleRoom">Single room</option>
            <option value="doubleRoom">Double room</option>
            <option value="tripleRoom">Triple Room</option>
            <option value="quadRoom">quad room</option>
            <option value="suiteSingleRoom">Single suite room</option>
            <option value="suiteDoubleRoom">Double suite room</option>
            <option value="suiteTripleRoom">Triple suite Room</option>
            <option value="suiteQuadRoom">quad suite room</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            type="number"
            name="Price"
            placeholder="Price"
            defaultValue={formRoomValue.Price}
          />
        </Form.Group>

        <Form.Group className="boxInput">
          <button type="button" onClick={addRoom}>
            <AddCircleOutlineRoundedIcon className="foodIcon" />
          </button>
        </Form.Group>

        <div></div>

        <Button className="buttonFoodForm" variant="primary" type="submit">
          {!foodRoomLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
      <ListGroup id="groupRoom"></ListGroup>
    </div>
  );
}
function initialRoomValue() {
  return {
    Room: "",
    Price: "",
  };
}
