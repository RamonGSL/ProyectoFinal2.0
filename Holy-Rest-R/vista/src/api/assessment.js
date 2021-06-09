import { API_URL } from "./../utils/constant";

const urlAssessment = `${API_URL}/server/controller/assessment/assessment.php`;

export async function insertAssesemt(puntuation, userId, hotelId) {
  let item = { Insert: "Insert" };
  let user = { IdUser: userId };
  let hotel = { IdHotel: hotelId };
  let assessment = { Assessment: puntuation };
  let datas = Object.assign(user, hotel, assessment, item);

  try {
    const params = await createParams(datas);
    const response = await fetch(urlAssessment, params);
    if (response.status === 200) return "Correct";
    const result = await response.json();
    if (response === "Error") return null;
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function mediaPuntuation(idHotel) {
  let item = { media: "media" };
  let hotel = { IdHotel: idHotel };
  let formData = Object.assign(hotel, item);
  try {
    const params = await createParams(formData);
    const response = await fetch(urlAssessment, params);
    if (response.status === 200) {
      let result = await response.json();
      return result;
    }
    return null;
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
