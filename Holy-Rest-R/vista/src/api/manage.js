import { API_URL } from "./../utils/constant";
import { datasUser } from "./user";
const urlManage = `${API_URL}/server/controller/manage/manage.php`;

export async function comproveAdmin() {
  let item = { Type: "comproveAdmin" };
  let formData = await datasUser();
  formData = { Id: formData[0].Id };
  formData = Object.assign(formData, item);
  console.log(formData);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlManage, params);
    const result = await response.json();
    console.log(result);
    if (result === "Don´t exist") {
      return null;
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createManage(id) {
  try {
    let item = { Type: "createManage" };
    let idHotel = { IdHotel: id };
    let idUser = await datasUser();
    idUser = { IdUser: idUser[0].Id };
    let formData = Object.assign(idUser, idHotel, item);

    const params = await createParams(formData);
    const response = await fetch(urlManage, params);
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
