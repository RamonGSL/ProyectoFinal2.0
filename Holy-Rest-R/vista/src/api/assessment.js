import { API_URL } from "./../utils/constant";
import { comproveAdmin } from "./manage";

const urlAssessment = `${API_URL}/server/controller/assessment/assessment.php`;

export async function insertAssesemt(puntuation, userId, hotelId) {
    let item = { Insert: "Insert" };
    let user = { IdUser: userId };
    let hotel = {IdHotel: hotelId};
    let assessment = {Assessment: puntuation};
    let datas = Object.assign(user, hotel, assessment, item);
    
    try {
      const params = await createParams(datas);
      const response = await fetch(urlAssessment, params);
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
  