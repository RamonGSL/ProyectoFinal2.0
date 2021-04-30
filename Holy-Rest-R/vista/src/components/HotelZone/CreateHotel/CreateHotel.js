import React, { useState, useEffect } from "react";

import "./scss/CreateHotel.scss";
import FoodForm from "./FoodForm/FoodForm";
import HotelForm from "./HotelForm/HotelForm";
import ImagesForm from "./ImagesForm/ImagesForm";
import RoomForm from "./RoomForm/RoomForm";

export default function CreateHotel() {
  const [hotelState, setHotelState] = useState(false);
  const changeStateHotel = (valueHotel) => {
    setHotelState(valueHotel);
  };
  setTimeout(() => {
    console.log(hotelState);
  }, 3000);

  return (
    <div className="Content-form">
      <HotelForm changeStateHotel={changeStateHotel} />
      {hotelState === true ? (
        <>
          <FoodForm />
          <RoomForm />
          <ImagesForm />
        </>
      ) : null}
    </div>
    //<div>

    /*   <Form onSubmit={onSubmit} onChange={onChangeHotel}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                name="Name"
                defaultValue={formData.Name}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Surnames"
                defaultValue={formData.Surnames}
                name="Surnames"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Email"
            name="Email"
            defaultValue={formData.Email}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue={formData.Password}
                name="Password"
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                defaultValue={formData.RepeatPassword}
                name="RepeatPassword"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            placeholder="Date of birth"
            name="DateOfBirth"
            defaultValue={formData.DateOfBirth}
            min="1950-01-01"
            max={date}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            id="Countrys"
            placeholder="Country of birth"
            defaultValue={formData.Country}
            name="Country"
          >
            <option>Select your country</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Accept all Terms"
            name="Terms"
            defaultValue={formData.Terms}
            onClick={(e) => {
              if (e.target.value === "") {
                e.target.value = "Accept";
              } else {
                e.target.value = "";
              }
            }}
          ></Form.Check>
          <div id="Terms">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              necessitatibus voluptas porro nesciunt officiis numquam, earum cum
              reprehenderit eum maiores quisquam error expedita vitae quo
              molestiae, excepturi, deleniti esse adipisci!
            </p>
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Sign Up" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div> */
  );
}
