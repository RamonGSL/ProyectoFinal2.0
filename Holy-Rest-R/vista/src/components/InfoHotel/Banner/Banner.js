import { React, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { API_URL } from "../../../utils/constant";
import { map } from "lodash";

export default function Banner(props) {
  const { images } = props;
  const urlImages = `${API_URL}server/imagesHotels/`;
  return (
    <div className="carouselIMG">
      <Carousel>
        {map(images, (index, value) => (
          <Carousel.Item key={value}>
            <img
              className="d-block w-100"
              src={`${urlImages}${index.IdHotel}/${index.NameImage}`}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
