import { React, useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "./scss/ChangeForm.scss";
import { API_URL } from "./../../utils/constant";
import { Modal } from "react-bootstrap";
import {
  isEmailValid,
  isNameValid,
  isSurnamesValid,
  isPasswordValid,
} from "./../../utils/validations";
import { logoutUser, updateUserApi } from "./../../api/user";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../../api/deleteUser";

export default function ChangeForm(props) {
  //datos del usuario
  const [userData, setUserData] = useState(props);
  const [formData, setFormData] = useState(userData.dataUser);
  const [modalOC, setModalOC] = useState(false);
  const [imageUser, setImageUser] = useState(
    `${API_URL}/server/images/${userData.dataUser.ProfileImage}`
  );
  const date = new Date().toISOString().split("T")[0];
  const [spinnerLoad, setSpinnerLoad] = useState(false);

  const requestServer = async (formData, encripted) => {
    let response = await updateUserApi(formData, encripted);
    return response;
  };

  const addFile = (e) => {
    let image = e.target.files;
    let imageConfirm;
    Array.from(image).forEach((image) => {
      let pattern = /^image/;
      if (!pattern.test(e.target.files[0].type)) {
        setImageUser(
          `${API_URL}/server/images/${userData.dataUser.ProfileImage}`
        );
        toast.warning("The format is invalid");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        imageConfirm = reader.result;
        setFormData({ ...formData, ProfileImage: imageConfirm });
        imageConfirm = imageConfirm.split(",");
        setImageUser(imageConfirm);
      };
    });
  };

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

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
      } else if (
        validCount === 9 &&
        formData.Password !== userData.dataUser.Password
      ) {
        toast.warning("Passwords must match");
      } else if (validCount === 10) {
        if (formData.Password !== formData.RepeatPassword) {
          toast.warning("Passwords must match");
        } else if (!isPasswordValid(formData.Password)) {
          toast.warning(
            "The password must be between 4 and 12 characters long"
          );
        }
      } else {
        setSpinnerLoad(true);
        let encripted = false;
        try {
          if (validCount === 9) {
            encripted = true;
          }
          let response = await requestServer(formData, encripted);
          if (response === "Correct Update") {
            toast.success(response);
            setTimeout(() => {
              logoutUser();
              window.location.href = "/signInUp";
              //<Redirect to="/user-zone" />;
            }, 1500);
          } else if (response == null) {
            toast.error("Server error please try again later");
          } else {
            toast.error(response);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSpinnerLoad(false);
        }
      }
    }
  };

  const deleteUserButton = async (e) => {
    e.preventDefault();
    console.log("Entra");
    let res = await deleteUser(userData);
    if (res === "Correct") {
      toast.success("Correct");
      setTimeout(() => {
        logoutUser();
        window.location.href = "/signInUp";
      }, 1500);
    } else {
      toast.warning("Error please try again");
    }
  };

  return (
    <div>
      <Form id="formUpdate" onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <div id="PreviewUserImagen">
                <Form.Control
                  id="fileInput"
                  type="file"
                  placeholder="ImageUser"
                  name="ProfileImage"
                  onInput={addFile}
                ></Form.Control>
                <img id="imgUser" src={imageUser} alt="imagenUser" />
              </div>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                defaultValue={userData.dataUser.Name}
                name="Name"
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Surnames"
                defaultValue={userData.dataUser.Surnames}
                name="Surnames"
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Email"
                defaultValue={userData.dataUser.Email}
                name="Email"
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue={userData.dataUser.Password}
                name="Password"
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue={userData.dataUser.Password}
                name="RepeatPassword"
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            placeholder="Date of birth"
            name="DateOfBirth"
            defaultValue={userData.dataUser.DateOfBirth}
            min="1950-01-01"
            max={date}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            id="Countrys"
            placeholder="Country of birth"
            defaultValue={userData.dataUser.Country}
            name="Country"
          >
            <option>{userData.dataUser.Country}</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!spinnerLoad ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
      <DeleteIcon
        onClick={(e) => {
          e.preventDefault();
          setModalOC(true);
        }}
      />
      <Modal
        show={modalOC}
        onHide={() => {
          setModalOC(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="textModal">You're sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalOC(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={(e) => {
              deleteUserButton(e);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
