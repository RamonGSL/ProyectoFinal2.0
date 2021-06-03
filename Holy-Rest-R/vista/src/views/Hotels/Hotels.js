import { React, useState, useEffect } from "react";
import "./scss/Hotels.scss";
import { getAllHotel } from "../../api/hotel";
import { getALLIMages } from "../../api/images";
import { map } from "lodash";
import { API_URL } from "../../utils/constant";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";
import InfoHotel from "../../components/InfoHotel/InfoHotel";
import { datasUser } from "../../api/user";

var HotelImages = [];
export default function Hotels() {
  const [loadImage, setLoadImage] = useState(false);
  const [hotels, setHotels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [infoHotel, setInfoHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getUser = async () => {
    let res = await datasUser();
    setUser(res);
  };

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

  const selectPoints = () => {};

  const urlImages = `${API_URL}server/imagesHotels/`;

  useEffect(() => {
    getHotels();
    getUser();
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
                      setInfoHotel(index);
                      setShowModal(true);
                    }}
                    className="iconsHotels"
                  ></InfoRoundedIcon>
                  <CommentRoundedIcon className="iconsHotels"></CommentRoundedIcon>
                  <ControlPointRoundedIcon
                    onClick={() => {
                      setOpenDialog(true);
                    }}
                    className="iconsHotels"
                  ></ControlPointRoundedIcon>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {showModal === true ? (
        <InfoHotel show={showModal} setShow={setShowModal} hotel={infoHotel} />
      ) : null}
      {openDialog === true ? (
        <div>
          <p setDialog={setOpenDialog}>hola</p>
        </div>
      ) : null}
    </div>
  );
}
