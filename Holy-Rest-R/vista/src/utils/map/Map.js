import { React, Console } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder";
import "./scss/Map.scss";

export default function Map(props) {
  onkeyup = () => {
    try {
      if (document.getElementsByTagName("strong")[0] !== undefined) {
        console.log("Entramos");
        const element = document.getElementsByTagName("strong")[0];
        console.log(element.textContent);
        props.setLocation(element.textContent);
      } else {
        console.log("No ha saltado la excepción");
        props.setLocation(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const container = document.getElementById("map");
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmFtb25nc2wiLCJhIjoiY2toaHlscXd6MTA3MDJ4bndla255Y2M1eSJ9.xp5RC0suNYVRO0NDh8z2lA";

  if (container) {
    if (container.childElementCount === 0) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40], // starting position
        zoom: 9, // starting zoom
      });

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
        })
      );
    }
  }

  return (
    <div className="containerMap">
      <div id="map"></div>
    </div>
  );
}
