import React from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder";
import "./scss/Map.scss";

export default function Map2() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmFtb25nc2wiLCJhIjoiY2toaHlscXd6MTA3MDJ4bndla255Y2M1eSJ9.xp5RC0suNYVRO0NDh8z2lA";

  const container = document.getElementById("map");
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
          mapboxgl: mapboxgl,
        })
      );
    }
  }

  return <div id="map"></div>;
}
