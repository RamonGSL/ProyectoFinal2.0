import React from "react";
import { Carousel } from "react-bootstrap";
export default function Banner() {
  return (
    <div className="carouselIMG">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
