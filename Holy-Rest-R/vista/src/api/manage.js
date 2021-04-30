import { API_URL } from "./../utils/constant";
import { datasUser } from "./user";
const urlUser = `${API_URL}/server/controller/manage/manage.php`;

export async function comproveAdmin() {
  let item = { Type: "comproveAdmin" };
  let formData = await datasUser();
  formData = { Id: formData[0].Id };
  formData = Object.assign(formData, item);
  console.log(formData);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    if (result === "Don´t exist") {
      return null;
    } else {
    }
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
