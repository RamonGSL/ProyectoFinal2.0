import { API_URL } from "./../utils/constant";
const urlUser = `${API_URL}/server/controller/hotel/hotel.php`;

export async function getHotel(idHotel) {
  let item = { Type: "ReturnHotel" };
  let formData = { Id: idHotel };

  formData = Object.assign(formData, item);
  console.log(formData);
  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createHotel(hotel) {
  let item = { Type: "CreateHotel" };
  let formData = Object.assign(hotel, item);
  console.log(formData);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
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
