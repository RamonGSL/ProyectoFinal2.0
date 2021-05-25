import { React, useState, useEffect } from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";

import LockOpenIcon from '@material-ui/icons/LockOpen';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import { toast } from "react-toastify";
import { map } from "lodash";
import { API_URL } from "./../../../utils/constant";
import { getAllHotel, disableHotelApi } from "../../../api/hotel";
import "./scss/HotelTable.scss";

export default function HotelTable() {

  const [hotels, setHotels] = useState(null);
  const [show, setShow] = useState(false);
  const [modalInput, setModalInput] = useState(null);
  const [hotelEmail, setHotelEmail] = useState(null);
  const [disable, setDisable] = useState(null);

  const initialDatas = async () => {
    let response = await getAllHotel();
    setHotels(response);
  };

  const disableHotel = (emailHotel, disable) => {
    if(disable === "0"){
      setShow(true);
      setHotelEmail(emailHotel)
      setDisable("1");

    }else if(disable === "1"){
      setShow(true);
      setHotelEmail(emailHotel);
      setDisable("0");
      
    }
  }

  
  const disableHotelServer = async (email, disable) => {
    email = { EmailHotel: email};
    disable = { DisabledHotel : disable};
    let formData = Object.assign(email, disable);
    let response = await disableHotelApi(formData);
    return response;
  }

  useEffect(() => {
    initialDatas();
  },[]);

    return (
     <div>
       <ListGroup>
         {map(hotels, (index, value) => (
          <ListGroup.Item
          key={value}
          id={index.Email}
          className="contentInfoUA"
          >
            <span className="infoUserFA"> {index.HotelName} </span>
            <span className="infoUserFA"> {index.Email} </span>
           

            {index.Disabled === "0" ? (
              <button onClick={() =>disableHotel(index.Email, index.Disabled)}>
              <NoEncryptionIcon className="deleteIcon" />
            </button>
            ): null}

            {index.Disabled === "1" ? (
              <button onClick={() => disableHotel(index.Email, index.Disabled)}>
              <LockOpenIcon className="correctIcon" />
            </button>
            ): null}
            
          </ListGroup.Item>
         ))}

      </ListGroup>

      <Modal show={show} onHide={()=>{
        setShow(false);
      } }>
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
            onChange={(e) => {
              setModalInput(e.target.value)
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShow(false);
          } }>
            Close
          </Button>
          <Button
            variant="primary"
             onClick={async () => {
             
              if (hotelEmail === modalInput) {
                let response = await disableHotelServer(hotelEmail,disable);
                if(response === "Correct"){
                  toast.success("Correct Change")
                  setTimeout(() => {
                    window.location.href = "/user-zone";
                  }, 1500);
                }else{
                  toast.warning("Server error try again");
                }
                
              } else {
                toast.warning("The email does not match");
              }
              setShow(false);
            }} 
          >
            Comprove
          </Button>
        </Modal.Footer>
      </Modal>

     </div>
    )
}
