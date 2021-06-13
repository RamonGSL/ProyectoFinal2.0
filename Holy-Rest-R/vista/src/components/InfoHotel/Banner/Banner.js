import { React, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { API_URL } from "../../../utils/constant";
import { map } from "lodash";

export default function Banner(props) {
  const { images, hotel } = props;
  const [img, setImg] = useState(null);
  const prepareImages = async () => {
    let expect = await images;
    let newArray = [];
    for (const image of expect) {
      if (image.IdHotel === hotel) {
        newArray.push(image);
      }
    }
    setImg(await newArray);
  };

  useEffect(() => {
    prepareImages();
  }, []);

  const urlImages = `${API_URL}server/imagesHotels/`;
  return (
    <div className="carouselIMG">
      <Carousel>
        {map(img, (index, value) => (
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
