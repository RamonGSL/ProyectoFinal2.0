import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, ListGroup } from "react-bootstrap";
import axios from "axios";
import { values, size, random } from "lodash";
import { toast } from "react-toastify";
import "./scss/ImagesForm.scss";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { API_URL } from "../../../../utils/constant";
import { createImages, getImages } from "./../../../../api/images";
var allImages = [];
export default function ImagesForm() {
  const [formHotelImage, setFormHotelImage] = useState(initialHotelImage());
  const [formHotelImageLoading, setRoomFormLoading] = useState(false);
  const [image, setImage] = useState(
    `${API_URL}vista/src/assets/userDefault.jpeg`
  );

  useEffect(() => {
    allImages = [];
    initialiceImages();
  }, []);

  const initialiceImages = async () => {
    let obj = null;
    let result = await getImages();
    if (result !== null) {
      await result.forEach((element) => {
        obj = {
          Type: element.Type,
          Image: element.base64,
        };
        if (obj !== null) {
          allImages.push(obj);
        }
      });
      imagesTable();
    }
  };

  const addImage = () => {
    let validCount = 0;

    values(formHotelImage).some((value) => {
      value && validCount++;
      return null;
    });
    if (size(formHotelImage) !== validCount) {
      toast.warning("Complete all fields");
    } else {
      if (formHotelImage.Type === "principal") {
        allImages.forEach((element) => {
          if (element.Type === "principal") {
            element.Type = "Normal";
          }
        });
      }

      allImages.push(formHotelImage);
      imagesTable();
    }
  };

  const addFile = (e) => {
    let image = e.target.files;
    let imageConfirm;
    Array.from(image).forEach((image) => {
      let pattern = /^image/;
      if (!pattern.test(e.target.files[0].type)) {
        setImage(`${API_URL}/server/images/${formHotelImage.Image}`);
        toast.warning("The format is invalid");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        imageConfirm = reader.result;
        setFormHotelImage({ ...formHotelImage, Image: imageConfirm });
        imageConfirm = imageConfirm.split(",");
        setImage(imageConfirm);
      };
    });
  };

  const deleteImage = (id) => {
    let newArray = [];
    document.getElementById(id).remove();
    allImages.forEach((element) => {
      if (element.Id !== id) {
        newArray.push(element);
      }
    });
    allImages = newArray;
  };

  const imagesTable = () => {
    let container = document.getElementById("groupImage");
    let number = 9999;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    allImages.forEach((element, i) => {
      element.Id = number.toString();
      let node = document.createElement("DIV");
      node.setAttribute("id", number.toString());
      node.classList.add("list-group-item");
      let imageCreate = document.createElement("img");
      imageCreate.setAttribute("src", element.Image);
      imageCreate.classList.add("imagesInList");
      let textnode = document.createTextNode(element.Type);
      let button = document.createElement("button");
      button.addEventListener("click", () => {
        deleteImage(number.toString());
      });

      let icon = document.createElement("img");
      let urlDelete = `${API_URL}/vista/src/assets/delete.svg`;
      icon.setAttribute("src", urlDelete);

      button.appendChild(icon);
      node.appendChild(imageCreate);
      node.appendChild(textnode);
      node.appendChild(button);
      document.getElementById("groupImage").appendChild(node);
    });
    delete formHotelImage.Id;
  };

  const onChangeImageHotel = (e) => {
    setFormHotelImage({
      ...formHotelImage,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (allImages.length === 0) {
      toast.warning("please select some food");
    } else {
      try {
        let result = await createImages(allImages);
        if (result === null) {
          toast.error("Error in server, please try later");
        } else {
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
    <div className="FormImages">
      <Form
        className="FormHotel"
        onSubmit={onSubmit}
        onChange={onChangeImageHotel}
      >
        <Form.Group className="boxInput">
          <div id="containerImage">
            <Form.Control
              className="input"
              id="inputImage"
              type="file"
              name="Image"
              placeholder="Image"
              onInput={addFile}
              defaultValue={formHotelImage.Image}
            />
            <img id="imgSelected" src={image} alt="imgSelected" />
          </div>
        </Form.Group>

        <Form.Group className="boxInput">
          <Form.Control
            className="input"
            as="select"
            name="Type"
            placeholder="Type Image"
            defaultValue={formHotelImage.Type}
          >
            <option>Default</option>
            <option value="principal">principal</option>
            <option value="Normal">Normal</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="boxInput">
          <button type="button" onClick={addImage}>
            <AddCircleOutlineRoundedIcon className="foodIcon" />
          </button>
        </Form.Group>

        <Button className="buttonFoodForm" variant="primary" type="submit">
          {!formHotelImageLoading ? "Submit" : <Spinner animation="border" />}
        </Button>
      </Form>
      <ListGroup id="groupImage"></ListGroup>
    </div>
  );
}
function initialHotelImage() {
  return {
    Type: "",
    Image: "",
  };
}
