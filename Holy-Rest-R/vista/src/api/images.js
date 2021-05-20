import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";
const urlImages = `${API_URL}/server/controller/imagesHotel/images.php`;

export async function createImages(Images) {
  let hotel = await comproveAdmin();
  let hotelItem = { IdHotel: hotel[0].IdHotel };
  Images.forEach((element) => {
    element = Object.assign(element, hotelItem);
  });

  //let item = { Type: "CreateFood" };
  //let arrayForOption = ["CreateFood"];
  let arrayForOption = [
    {
      Type: "CreateImages",
    },
  ];
  Images.push(arrayForOption);
  console.log(Images);
  try {
    const params = await createParams(Images);
    const response = await fetch(urlImages, params);
    const result = await response.json();
    //console.log(result);
    //return result;
  } catch (error) {
    console.log(error);
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
