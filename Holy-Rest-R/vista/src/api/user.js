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
    localStorage.setItem("Email", formData["Email"]);
    localStorage.setItem("Password", formData["Password"]);
    return "Correct login";
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutUser = () => {
  localStorage.removeItem("");
};

export const getDatasUser = () => {
  let user = [];
  user[0] = localStorage.getItem("Email");
  user[1] = localStorage.getItem("Password");
  return user;
};

export const isUserLoged = () => {
  const userSave = getDatasUser();
  if (!userSave[0]) {
    return null;
  } else {
    if (!userSave[1]) {
      return null;
    } else {
      return userSave;
    }
  }
};

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
