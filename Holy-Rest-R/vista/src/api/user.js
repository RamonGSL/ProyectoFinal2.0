import { API_URL } from "./../utils/constant";
import { deleteUser } from "./deleteUser";
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

export async function updateUserApi(formData, encripted) {
  if (encripted === true) {
    let item = { Encript: "Encript" };
    formData = Object.assign(formData, item);
  }
  let item = { Type: "update" };
  formData = Object.assign(formData, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    if (result.length === 1) {
      InsertStorage(result[0].Email, result[0].Password);
      return "Correct Update";
    }
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
      InsertStorage(result.Email, result.Password);
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
  if (formData.Email === null || formData.Password === null) return null;
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

export async function getAllNames() {
  let item = { Type: "names" };
  let formData = getDatasUser();
  if (formData.Email === null || formData.Password === null) return null;
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

export async function deleteUserData(user) {
  let item = { Type: "returnDataForDelete" };
  let formData = Object.assign(user, item);

  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    const resultPrepare = { dataUser: result[0] };
    const newResult = await deleteUser(resultPrepare);
    return newResult;
  } catch (error) {
    console.log(error);
    return null;
  }
  /*  let item = { Type: "delete" };
  let formData = getDatasUser();
  if (formData.Email === null || formData.Password === null) return null;
  formData = Object.assign(formData, item, user);
  try {
    const params = await createParams(formData);
    const response = await fetch(urlUser, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  } */
}
export async function changeRole(user) {
  if (user.user === "Hotel") {
    user.user = "1";
  } else if (user.user === "Admin") {
    user.user = "2";
  } else if (user.user === "User") {
    user.user = "0";
  } else {
    return null;
  }
  let item = { Type: "role" };
  let formData = getDatasUser();
  if (formData.Email === null || formData.Password === null) return null;
  formData = Object.assign(formData, item, user);
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

export const logoutUser = () => {
  localStorage.removeItem("Email");
  localStorage.removeItem("Password");
  window.location.assign("/signInUp");
};

export const getDatasUser = () => {
  let user = {
    Email: localStorage.getItem("Email"),
    Password: localStorage.getItem("Password"),
  };
  return user;
};

export const InsertStorage = (email, password) => {
  localStorage.setItem("Email", email);
  localStorage.setItem("Password", password);
};

export const isUserLoged = () => {
  const userSave = getDatasUser();
  if (userSave.Email === null) {
    return false;
  } else {
    if (userSave.Password === null) {
      return false;
    } else {
      return true;
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
