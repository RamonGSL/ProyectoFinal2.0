import { React,  useState, useEffect } from 'react'
import "./scss/Hotels.scss"
import { getAllHotel } from "../../api/hotel";
import { getALLIMages } from "../../api/images";
import { map } from "lodash";


export default function Hotels() {

    const [hotels, setHotels] = useState(null);
    const [hotelImage, setHotelImage] = useState(null)

    const getHotels = async () => {
        let hotels = await getAllHotel();
        setHotels(hotels);
        let images = await getALLIMages();
       /*  if(images !== null) {
            setHotelImage(images);
        } */
    }

    useEffect(() => {
        getHotels();
    }, [])

    return (
        <div className="Hotels">
            <h2>Hotels</h2>
            <div className="hotelBox">
                {map(hotels, (index, value) => (
                <div key={value} id={index.Name} className="hotel">
                    <img src="" alt="" />
                    <h2>{index.HotelName}</h2>
                </div>
                ))}
                
            </div>
        </div>
    )
}
