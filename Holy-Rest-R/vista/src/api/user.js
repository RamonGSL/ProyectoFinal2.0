import { API_URL } from "./../utils/constant";
const urlUser = `${API_URL}/server/controller/user/user.php`;

export async function registerApi(formData) {
  let item = { Type: "register" };
  formData = Object.assign(formData, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response;
    console.log(result);
    return "Correct registration";
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  let item = { Type: "login" };
  formData = Object.assign(formData, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response;
    console.log(result);
    return "Correct login";
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
