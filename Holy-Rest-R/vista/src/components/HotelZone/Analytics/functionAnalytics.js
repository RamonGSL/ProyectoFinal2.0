import { API_URL } from "./../../../utils/constant";

const urlAssessment = `${API_URL}/server/controller/assessment/assessment.php`;

export async function selectScoreUsers(score) {
  let item = { Type: "getScores" };
  let scorePrepare = { Score: score };
  let request = Object.assign(scorePrepare, item);
  try {
    const params = await createParams(request);
    const response = await fetch(urlAssessment, params);
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function users(idHotel) {}

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
