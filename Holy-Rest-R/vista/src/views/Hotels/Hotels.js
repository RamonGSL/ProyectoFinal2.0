import { React, useState, useEffect } from "react";
import "./scss/Hotels.scss";
import { getAllHotel } from "../../api/hotel";
import { getALLIMages, getUrlImg } from "../../api/images";
import { map } from "lodash";
import { API_URL } from "../../utils/constant";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";
import InfoHotel from "./InfoHotel/InfoHotel";
var HotelImages = [];
export default function Hotels() {
  const [loadImage, setLoadImage] = useState(false);
  const [hotels, setHotels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [infoHotel, setInfoHotel] = useState(null);

  const getHotels = async () => {
    let hotels = await getAllHotel();
    setHotels(hotels);

    let images = await getALLIMages();
    images.forEach((image) => {
      if (image.Type === "1") {
        HotelImages.push(image);
      }
    });

    hotels.forEach((hotel) => {
      let image = returnImageHotel(hotel.Id);
      if (image !== null) {
        hotel.ImagePrincipal = image;
      }
    });
    console.log(hotels);
    setLoadImage(true);
  };

  const returnImageHotel = (idHotel) => {
    let dataReturn = null;
    HotelImages.forEach((image) => {
      if (image.IdHotel === idHotel) {
        dataReturn = `${urlImages}${idHotel}/${image.NameImage}`;
      }
    });

    return dataReturn;
  };
  const urlImages = `${API_URL}server/imagesHotels/`;

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="Hotels">
      <div className="hotelBox">
        {loadImage === true ? (
          <div className="contentHotels">
            {map(hotels, (index, value) => (
              <div key={value} id={index.Name} className="conteinerHotel">
                <div className="containerImgPrincipal">
                  <img
                    className="imgPrincipalHotel"
                    src={index.ImagePrincipal}
                    alt="Img"
                  />
                </div>
                <div className="contentInfoHotel">
                  <p className="textImg">{index.HotelName}</p>
                  <p className="textImg">{index.Description}</p>
                  <InfoRoundedIcon
                    onClick={() => {
                      setInfoHotel(index.Id);
                      setShowModal(true);
                      console.log(showModal);
                    }}
                    className="iconsHotels"
                  ></InfoRoundedIcon>
                  <CommentRoundedIcon className="iconsHotels"></CommentRoundedIcon>
                  <ControlPointRoundedIcon className="iconsHotels"></ControlPointRoundedIcon>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {showModal === true ? (
        <InfoHotel show={showModal} setShow={setShowModal} hotel={infoHotel} />
      ) : null}
    </div>
  );
}
