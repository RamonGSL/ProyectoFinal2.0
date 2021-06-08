import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { insertAssesemt } from "../../api/assessment";
import "./scss/Assessment.scss";
//primero react luego api luego css libreria
export default function Assessment(props) {
  const { openDialog, setDialog, user, hotel } = props;

  const [puntuation, setPuntuation] = useState(null);
  const [userId, setUserId] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  const returnIdUser = async () => {
    if (user !== null) setUserId(user[0].Id);
  };

  const returnIdHotel = async () => {
    if (hotel !== null) setHotelId(hotel);
  };

  const onChange = (e) => {
    let newPuntuation = parseInt(e.target.value);
    if (newPuntuation < 0 || newPuntuation > 10) {
      setPuntuation(null);
    } else {
      setPuntuation(newPuntuation);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (puntuation !== null) {
      let res = await insertAssesemt(puntuation, userId, hotelId);
      console.log(res);
      if (res === "Correct") toast.success("succes");
    } else {
      toast.warning("Please select correct puntuation");
    }
  };

  useEffect(() => {
    returnIdUser();
    returnIdHotel();
  }, []);

  return (
    <>
      <Modal
        className="basic-modal"
        centered
        size="xs"
        show={openDialog}
        onHide={() => setDialog(false)}
      >
        <Modal.Header>
          <Modal.Title>Select your Puntuation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="formPuntuation"
            onSubmit={onSubmit}
            onChange={onChange}
          >
            <input className="inputPuntuation" type="number" min="1" max="10" />
            <button className="submitPuntuation">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
