import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";
const urlImages = `${API_URL}/server/controller/imagesHotel/images.php`;

export async function createImages(Images) {
  let hotel = await comproveAdmin();
  let hotelItem = { IdHotel: hotel[0].IdHotel };
  Images.forEach((element) => {
    element = Object.assign(element, hotelItem);
  });

  let arrayForOption = [
    {
      Type: "CreateImages",
    },
  ];
  Images.push(arrayForOption);
  try {
    const params = await createParams(Images);
    const response = await fetch(urlImages, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getImages() {
  let hotel = await comproveAdmin();
  if (hotel === null) return null;
  let idHotel = { idHotel: await hotel[0].IdHotel };
  let item = { Type: "GetImages" };
  let hotelGet = Object.assign(idHotel, item);
  try {
    const params = await createParams(hotelGet);
    const response = await fetch(urlImages, params);
    const result = await response.json();
    if (result !== "0 datas" || result !== null)
      result.forEach((element) => {
        element.base64 = "data:;base64," + element.base64;
        if (element.Type === "0") element.Type = "Normal";
        if (element.Type === "1") element.Type = "principal";
      });
    return await result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getALLIMages() {
  let item = { GetImages: "GetImages" };
  try {
    const params = await createParams(item);
    const response = await fetch(urlImages, params);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUrlImg(image) {
  let item = { GetImages: "extensionImg", NameImg: image };
  try {
    const params = await createParams(item);
    const response = await fetch(urlImages, params);
    const result = await response.json();
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
