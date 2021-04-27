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

export async function updateUserApi(formData, encripted) {
  console.log(formData);
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
