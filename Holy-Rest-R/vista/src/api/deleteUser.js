import { API_URL } from "./../utils/constant";

const urlDelete = `${API_URL}/server/controller/Delete.php`;

export async function deleteUser(formData) {
  try {
    const params = await createParams(formData);
    const response = await fetch(urlDelete, params);
    console.log(response);
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
