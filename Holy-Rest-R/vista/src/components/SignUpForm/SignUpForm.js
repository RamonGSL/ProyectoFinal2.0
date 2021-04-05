import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import "./scss/SignUpForm.scss";
import {
  isEmailValid,
  isNameValid,
  isSurnamesValid,
  isPasswordValid,
} from "./../../utils/validations";
import { newUser } from "./../../utils/services";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  //Datos del usuario
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setsignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    //Cuenta los datos que a introducido el usuario para comprobar si estan todos
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    //validación del formulario
    if (validCount !== size(formData)) {
      toast.warning("Complete all fields");
    } else {
      if (!isNameValid(formData.Name)) {
        toast.warning(
          "The name must only contain alphabetic characters between 2 and 15 "
        );
      } else if (!isSurnamesValid(formData.Surnames)) {
        toast.warning(
          "The name must only contain alphabetic characters between 2 and 30"
        );
      } else if (!isEmailValid(formData.Email)) {
        toast.warning("Invalid Email");
      } else if (formData.Password !== formData.RepeatPassword) {
        toast.warning("Passwords must match");
      } else if (!isPasswordValid(formData.Password)) {
        toast.warning("The password must be between 4 and 12 characters long");
      } else {
        setsignUpLoading(true);
        newUser(formData);
      }
    }
    setTimeout(() => {
      setsignUpLoading(false);
    }, 3000);
  };

  //Cuando algun elemento del formulario cambia actualiza nuestro formData
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  //al iniciar rellenamos el select del form con todos los paises
  useEffect(() => {
    const country = document.getElementById("Countrys");
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((resp) => {
        resp.data.forEach((element) => {
          let option = document.createElement("option");
          option.value = element.name;
          option.text = element.name;
          country.appendChild(option);
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }, []);

  return (
    <div className="sign-up-form">
      <h2>Creat your account</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              necessitatibus voluptas porro nesciunt officiis numquam, earum cum
              reprehenderit eum maiores quisquam error expedita vitae quo
              molestiae, excepturi, deleniti esse adipisci!
            </p>
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
    </div>
  );
}
//valores iniciales del formulario y el objeto formData
function initialFormValue() {
  return {
    Name: "",
    Surnames: "",
    Email: "",
    Password: "",
    RepeatPassword: "",
    DateOfBirth: "",
    Country: "",
    Terms: "",
  };
}
