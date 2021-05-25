import { API_URL } from "./../utils/constant";
import { createManage } from "./manage";
import { getDatasUser } from "./user";
const urlHotel = `${API_URL}/server/controller/hotel/hotel.php`;

export async function getHotel(idHotel) {
  let item = { Type: "ReturnHotel" };
  let formData = { Id: idHotel };

  formData = Object.assign(formData, item);
  console.log(formData);
  try {
    const params = await createParams(formData);
    const response = await fetch(urlHotel, params);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createHotel(hotel) {
  let item = { Type: "CreateHotel" };
  let datasUser = getDatasUser();
  let formData = Object.assign(hotel, item, datasUser);
  console.log(formData);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlHotel, params);
    const result = await response.json();
    if (result === "Error") {
      return null;
    } else {
      let newResult = await createManage(result);
      console.log(newResult);
      if (newResult === "Correct") {
        return newResult;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllHotel() {
  let formData = { Type: "getAllHotels" };
  
  try {
    const params = await createParams(formData);
    const response = await fetch(urlHotel, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function disableHotelApi(dataHotel) {
  let item = { Type: "disableHotel" };
  let formData = Object.assign(dataHotel, item);
  console.log(formData);
  try {
    const params = await createParams(formData);
    const response = await fetch(urlHotel, params);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


const createParams = async (formData) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  return params;
};
