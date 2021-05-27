import { React, useState, useEffect } from "react";
import "./scss/Hotels.scss";
import { getAllHotel } from "../../api/hotel";
import { getALLIMages } from "../../api/images";
import { map } from "lodash";
import { API_URL } from "../../utils/constant";

var HotelImages = [];
export default function Hotels() {
  const [hotels, setHotels] = useState(null);

  const getHotels = async () => {
    let hotels = await getAllHotel();
    setHotels(hotels);

    let images = await getALLIMages();
    images.forEach((image) => {
      if (image.Type === "1") {
        HotelImages.push(image);
      }
    });
  };

  const returnImageHotel = (idHotel) => {
    console.log(HotelImages);
    HotelImages.forEach((element) => {
      console.log(element);
    });

    /*  if (index.IdHotel === idHotel) {
        const prepareImage = `${urlImages}/${idHotel}/${index.ImageName}`;
        console.log(prepareImage);
    } */
  };
  const urlImages = `${API_URL}/server/imagesHotels/`;

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="Hotels">
      <div className="hotelBox">
        {map(hotels, (index, value) => (
          <div
            onLoadedMetadata={returnImageHotel(index.Id)}
            key={value}
            id={index.Name}
            className="hotel"
          >
            <p>{index.HotelName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
