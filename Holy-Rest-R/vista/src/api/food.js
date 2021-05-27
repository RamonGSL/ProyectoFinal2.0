import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";
const urlFood = `${API_URL}/server/controller/food/food.php`;

export async function createFood(Food) {
  let hotel = await comproveAdmin();
  let hotelItem = { IdHotel: hotel[0].IdHotel };
  Food.forEach((element) => {
    element = Object.assign(element, hotelItem);
  });
  let arrayForOption = [
    {
      Type: "CreateFood",
    },
  ];
  Food.push(arrayForOption);
  console.log(Food);
  try {
    const params = await createParams(Food);
    const response = await fetch(urlFood, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getFoods() {
  let hotel = await comproveAdmin();
  if (hotel === null) return null;
  let idHotel = { idHotel: await hotel[0].IdHotel };
  let item = { Type: "GetFoods" };
  let hotelGet = Object.assign(idHotel, item);
  try {
    const params = await createParams(hotelGet);
    const response = await fetch(urlFood, params);
    const result = await response.json();
    console.log(response);
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
