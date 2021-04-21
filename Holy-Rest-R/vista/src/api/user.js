import { API_URL } from "./../utils/constant";
const urlUser = `${API_URL}/server/controller/user/user.php`;

export async function registerApi(formData) {
  let item = { Type: "register" };
  formData = Object.assign(formData, item);
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

export async function loginApi(formData) {
  let item = { Type: "login" };
  formData = Object.assign(formData, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    if (result !== "Incorrect Login") {
      localStorage.setItem("Email", result.Email);
      localStorage.setItem("Password", result.Password);
      return "Correct Login";
    } else {
      return "Incorrect Login";
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function datasUser() {
  let item = { Type: "datas" };
  let formData = getDatasUser();
  formData = Object.assign(formData, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutUser = () => {
  localStorage.removeItem("Email");
  localStorage.removeItem("Password");
};

export const getDatasUser = () => {
  let user = {
    Email: localStorage.getItem("Email"),
    Password: localStorage.getItem("Password"),
  };
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
