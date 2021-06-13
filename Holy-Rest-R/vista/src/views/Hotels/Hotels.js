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
import Assessment from "../../components/Assessment/Assessment";

var HotelImages = [];

export default function Hotels() {
  let urlImage = "../../assets/userDefault.jpeg";
  const [loadImage, setLoadImage] = useState(false);
  const [hotels, setHotels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [infoHotel, setInfoHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getUser = async () => {
    let res = await datasUser();
    if (res !== null) setUser(res);
  };

  const getHotels = async () => {
    let hotels = await getAllHotel();
    if (hotels !== null) setHotels(hotels);

    let images = await getALLIMages();
    if (images !== null) {
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
      setLoadImage(true);
    }
  };

  const returnImageHotel = (idHotel) => {
    console.log(idHotel);
    let dataReturn = null;
    HotelImages.forEach((image) => {
      if (image.IdHotel === idHotel) {
        dataReturn = `${urlImages}${idHotel}/${image.NameImage}`;
      }
    });
    if (dataReturn === null)
      dataReturn = `${API_URL}vista/src/assets/HomeAssets/DefaultHoteljpg.jpg`;
    console.log(dataReturn);
    return dataReturn;
  };

  const urlImages = `${API_URL}server/imagesHotels/`;

  useEffect(() => {
    getHotels();
    getUser();
  }, []);

  return (
    <>
      {hotels !== null ? (
        <div className="Hotels">
          <div className="hotelBox">
            {loadImage === true ? (
              <div className="contentHotels">
                {map(hotels, (index, value) => (
                  <div key={value} id={index.Name} className="conteinerHotel">
                    {index.Disabled !== 1 ? (
                      <>
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
                          {user !== null ? (
                            <ControlPointRoundedIcon
                              onClick={() => {
                                setOpenDialog(true);
                              }}
                              className="iconsHotels"
                            ></ControlPointRoundedIcon>
                          ) : null}
                        </div>
                        {showModal === true ? (
                          <InfoHotel
                            show={showModal}
                            setShow={setShowModal}
                            hotel={infoHotel}
                          />
                        ) : null}
                        {openDialog === true ? (
                          <div>
                            <Assessment
                              user={user}
                              openDialog={openDialog}
                              setDialog={setOpenDialog}
                              hotel={index.Id}
                            />
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
