import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";

const urlAssessment = `${API_URL}/server/controller/assessment/assessment.php`;

export async function insertAssesemt(idUser) {
    let item = { Type: "Insert" };
    let user = { idUser: idUser };
    let obj = Object.assign(user, item);
    try {
      const params = await createParams(obj);
      const response = await fetch(user, params);
      const result = await response.json();
      if (response === "0 data") return null;
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
  