import { React, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import "./scss/Select.scss";

export default function SelectFront(props) {
  const [paisSelected, setPaisSelected] = useState(null);
  const [citySelected, setcitySelected] = useState(null);

  async function getCity() {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      let paises = document.getElementById("Paises");
      result.data.forEach((element) => {
        let option = document.createElement("option");
        option.value = element.country;
        option.text = element.country;
        paises.appendChild(option);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getCiudades() {
    try {
      let Ciudades = document.getElementById("Ciudades");
      while (Ciudades.firstChild) {
        Ciudades.removeChild(Ciudades.firstChild);
      }
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      result.data.forEach((element) => {
        if (element.country === paisSelected) {
          element.cities.forEach((element2) => {
            let option = document.createElement("option");
            option.value = element2;
            option.text = element2;
            Ciudades.appendChild(option);
          });
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    getCity();
  }, []);

  useEffect(() => {
    getCiudades();
  }, [paisSelected]);

  return (
    <div>
      <div className="search-form">
        <FormControl
          className="select"
          as="select"
          id="Paises"
          name="Paises"
          placeholder="Paises"
          onChange={(e) => {
            setPaisSelected(e.target.value);
          }}
        >
          <option>Paises</option>
        </FormControl>

        {paisSelected !== null ? (
          <FormControl
            className="select"
            as="select"
            id="Ciudades"
            placeholder="Ciudades"
            onChange={(e) => {
              setPaisSelected(e.target.value);
              props.setLocation(paisSelected + "," + e.target.value);
            }}
          >
            <option>Ciudades</option>
          </FormControl>
        ) : null}
      </div>
    </div>
  );
}
