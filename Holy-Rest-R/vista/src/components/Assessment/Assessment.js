import {React, useState} from 'react'
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "./scss/Assessment.scss"
export default function Assessment(props) {
    const { openDialog, setDialog } = props;
    const [puntuation, setPuntuation] = useState(null)

    const onChange = (e) => {
        let newPuntuation = parseInt(e.target.value);
        if (newPuntuation < 0 || newPuntuation > 10  ){
            setPuntuation(null)
        }else{
            setPuntuation(newPuntuation);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(puntuation)
        if(puntuation !== null) {
            toast.success("Good");
        }else{
            toast.warning("Please select correct puntuation");
        }
    }
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
            <form className="formPuntuation" onSubmit={onSubmit} onChange={onChange}>
            <input className="inputPuntuation" type="number" min = "1" max = "10" />
            <button className="submitPuntuation">Submit</button>
            </form>
           
          </Modal.Body>
        </Modal>
        </>
    )
}
