import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";
const urlRoom = `${API_URL}/server/controller/room/room.php`;

export async function createRoom(Room) {
  let hotel = await comproveAdmin();
  let hotelItem = { IdHotel: hotel[0].IdHotel };
  Room.forEach((element) => {
    element = Object.assign(element, hotelItem);
  });

  //let item = { Type: "CreateFood" };
  //let arrayForOption = ["CreateFood"];
  let arrayForOption = [
    {
      Type: "CreateRoom",
    },
  ];
  Room.push(arrayForOption);
  console.log(Room);
  try {
    const params = await createParams(Room);
    const response = await fetch(urlRoom, params);
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
