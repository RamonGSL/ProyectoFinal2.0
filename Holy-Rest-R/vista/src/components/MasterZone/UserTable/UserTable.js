import { React, useState, useEffect } from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";

import {
  getAllNames,
  deleteUserData,
  changeRole,
  getDatasUser,
  logoutUser,
} from "./../../../api/user";
import { API_URL } from "./../../../utils/constant";
import "./scss/UserTable.scss";
import { toast } from "react-toastify";
import { map } from "lodash";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FaceIcon from "@material-ui/icons/Face";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LocationCityIcon from "@material-ui/icons/LocationCity";

export default function UserTable() {
  const [userNames, setUserNames] = useState(null);

  const [show, setShow] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [modalInput, setModalInput] = useState(null);
  const [emailSelected, setEmailSelected] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseRole = () => setShowRole(false);
  const handleShowRole = () => setShowRole(true);

  const inputChange = (e) => {
    setModalInput(e.target.value);
  };

  const initialDatas = async () => {
    let response = await getAllNames();
    setUserNames(response);
  };

  const deletUserEmail = async (email) => {
    let item = { user: email };
    let response = await deleteUserData(item);

    if (response === "Correct") {
      toast.success("User has been successfully deleted");
    } else {
      toast.error("Error please try again later");
    }
  };

  const changeUserRole = async (role) => {
    let item = { user: role };
    let response = await changeRole(item);

    if (response === "User role has been changed successfully") {
      toast.success(response);
    } else if (response === null) {
      toast.error("Sorry, error in server please try again");
    } else {
      toast.warning(response);
    }
  };

  const deletUser = (email) => {
    handleShow();
    setModalInput("");
    setEmailSelected(email);
  };

  const updateRole = (email) => {
    handleShowRole();
    setModalInput("");
    setEmailSelected(email);
  };
  useEffect(() => {
    initialDatas();
  }, []);

  return (
    <div>
      <ListGroup>
        {map(userNames, (index, value) => (
          <ListGroup.Item
            key={value}
            id={index.Email}
            className="contentInfoUA"
          >
            <span className="infoUserFA"> {index.Name} </span>{" "}
            {index.ProfileImage === null ? (
              <img
                className="imgProfileUA"
                src={`${API_URL}/server/images/userDefault.jpeg`}
                alt=""
              />
            ) : null}
            {index.ProfileImage !== null ? (
              <img
                className="imgProfileUA"
                src={`${API_URL}/server/images/${index.ProfileImage}`}
                alt=""
              />
            ) : null}
            <span className="infoUserFA"> {index.Email} </span>
            <button onClick={() => deletUser(index.Email)}>
              <DeleteRoundedIcon className="deleteIcon" />
            </button>
            <button onClick={() => updateRole(index.Email)}>
              <AddCircleOutlineRoundedIcon className="roleIcon" />
            </button>
            {index.RoleUser === "0" ? <FaceIcon /> : null}
            {index.RoleUser === "1" ? <LocationCityIcon /> : null}
            {index.RoleUser === "2" ? <SupervisorAccountIcon /> : null}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="textModal">You're sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="textModal" htmlFor="comproveEmail">
            Write the user's email
          </label>
          <input
            className="modalInput textModal"
            name="comproveEmail"
            type="text"
            onChange={inputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (emailSelected === modalInput) {
                deletUserEmail(emailSelected);
                let emailLocal = getDatasUser();
                emailLocal = emailLocal.Email;
                if (emailSelected === emailLocal) {
                  logoutUser();
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 1500);
                } else {
                  let deleteChild = document.getElementById(emailSelected);
                  if (deleteChild.parentNode) {
                    deleteChild.parentNode.removeChild(deleteChild);
                  }
                }
              } else {
                toast.warning("The email does not match");
              }
              handleClose();
            }}
          >
            Comprove
          </Button>
        </Modal.Footer>
      </Modal>

      {
        <Modal show={showRole} onHide={handleCloseRole}>
          <Modal.Header closeButton>
            <Modal.Title className="textModal">You're sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="textModal" htmlFor="roleUser">
              Write Hotel for upgrade user to Admin for Hotel or Write Admin for
              upgrade user to Admin for Web or Write User for upgrade to User
              for Web
            </label>
            <input
              className="modalInput textModal"
              name="roleUser"
              type="text"
              onChange={inputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRole}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (
                  modalInput === "Hotel" ||
                  modalInput === "Admin" ||
                  modalInput === "User"
                ) {
                  changeUserRole(modalInput);
                  let emailLocal = getDatasUser();
                  emailLocal = emailLocal.Email;
                  console.log(emailLocal);
                  console.log(emailSelected);
                  if (emailSelected === emailLocal) {
                    logoutUser();
                    setTimeout(() => {
                      window.location.href = "/";
                    }, 1500);
                  }
                } else {
                  toast.warning("The inserted parameter does not match");
                }
                handleCloseRole();
              }}
            >
              Comprove
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
