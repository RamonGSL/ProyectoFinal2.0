import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import SearchIcon from "@material-ui/icons/SearchRounded";
import ChatIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import StarIcon from "@material-ui/icons/StarBorderRounded";

import Logo from "./../../assets/logo.png";
import Logo2 from "./../../assets/logo2.png";

import BasicModal from "./../../components/Modal/BasicModal/BasicModal";
import SignUpForm from "./../../components/SignUpForm/SignUpForm";
import SignInForm from "./../../components/SignInForm/SignInForm";

import "./scss/SignInSingUp.scss";

export default function SignInSingUp() {
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={Logo} alt="Logo" />
      <div>
        <h2>
          <SearchIcon />- Find your perfect hotel
        </h2>

        <h2>
          <ChatIcon />- Share your experience
        </h2>

        <h2>
          <StarIcon />- Rate the hotels you've been to
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;
  return (
    <Col className="signin-signup__right" xs={6}>
      <div className="containerInfoSign">
        <img className="imgLogo" src={Logo2} alt="Logo" />
        <h2 className="firstTitle">
          To have a complete experience it will be necessary to register
        </h2>
        <h3 className="secondTitle">Will last a few seconds</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Sign Up
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Sign In
        </Button>
      </div>
    </Col>
  );
}
