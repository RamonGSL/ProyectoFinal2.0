import React, { useState, useEffect } from "react";
import { Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isHotelNameValid } from "./../../../../utils/validations";
import "./scss/HotelForm.scss";
//import Map from "./../../../../utils/map/Map";
import Map from "../../../../utils/map/Map";
import { createHotel } from "./../../../../api/hotel";

export default function HotelForm(props) {
  const setHotel = (valueHotel) => {
    props.changeStateHotel(valueHotel);
  };
  const [formHotelValue, setFormHotelValue] = useState(initialHotelValue());
  const [hotelFormLoading, setHotelFormLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const onChangeHotel = (e) => {
    setFormHotelValue({ ...formHotelValue, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    console.log(formHotelValue);
    e.preventDefault();
    let validCount = 0;
    values(formHotelValue).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formHotelValue)) {
      toast.warning("Complete all fields");
    } else {
      if (!isHotelNameValid(formHotelValue.HotelName)) {
        toast.warning(
          "The hotel name must only contain alphabetic characters between 2 and 25 "
        );
      } else if (isNaN(formHotelValue.Prefix)) {
        toast.warning("The hotel prefix must only contain numeric characters");
      } else if (isNaN(formHotelValue.Phone)) {
        toast.warning(
          "The hotel number must only contain numeric characters between to 6 and 13"
        );
      } else if (formHotelValue.Description.length > 200) {
        toast.warning("The hotel description must only contain 200 characters");
      } else if (location === null || location === "") {
        toast.warning("Please select location");
      } else {
        setFormHotelValue({ ...formHotelValue, Location: location });
        try {
          let response = await createHotel(formHotelValue);
          if (response === "Correct") {
            toast.success(response);
          } else if (response == null) {
            toast.error("Server error please try again later");
          } else {
            toast.error(response);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setHotelFormLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const prefixNumber = document.getElementById("Prefix");

    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((resp) => {
        resp.data.forEach((element) => {
          if (element.callingCodes[0] !== "") {
            let option = document.createElement("option");
            option.value = element.callingCodes;
            option.text = element.callingCodes;
            prefixNumber.appendChild(option);
          }
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }, []);

  return (
    <div>
      <h2 className="hotelFormTitle">Create Your Hotel</h2>

      <Form className="FormHotel" onSubmit={onSubmit} onChange={onChangeHotel}>
        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            type="text"
            name="HotelName"
            placeholder="The name of your hotel"
            defaultValue={formHotelValue.HotelName}
          />
        </Form.Group>

        <Form.Group className="boxInput">
          <Row>
            <Form.Control
              className="select"
              as="select"
              id="Prefix"
              name="Prefix"
              placeholder="Prefix"
              defaultValue={formHotelValue.Prefix}
            >
              <option>Prefix</option>
            </Form.Control>
            <Form.Control
              className="input"
              type="text"
              name="Phone"
              maxLength="13"
              placeholder="The phone of your hotel"
              defaultValue={formHotelValue.Phone}
            />
          </Row>
        </Form.Group>
        <Form.Group className="boxInput">
          <small className="numOfLetters">
            {formHotelValue.Description.length}/200
          </small>
          <Form.Control
            as="textarea"
            className="textarea"
            name="Description"
            cols="20"
            rows="4"
            maxLength="200"
            placeholder="The Description of your hotel"
            defaultValue={formHotelValue.Description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Accept all Terms"
            name="Terms"
            defaultValue={formHotelValue.Terms}
            onClick={(e) => {
              if (e.target.value === "") {
                e.target.value = "Accept";
              } else {
                e.target.value = "";
              }
            }}
          ></Form.Check>
          <div id="Terms">
            <p className="textTerms">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              necessitatibus voluptas porro nesciunt officiis numquam, earum cum
              reprehenderit eum maiores quisquam error expedita vitae quo
              molestiae, excepturi, deleniti esse adipisci!
            </p>
          </div>
        </Form.Group>
        <Map setLocation={setLocation} />
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
    Description: "",
    Phone: "",
    Prefix: "",
    Terms: "",
  };
}
