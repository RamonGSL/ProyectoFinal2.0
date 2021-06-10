import { API_URL } from "./../../../utils/constant";

const urlAssessment = `${API_URL}/server/controller/assessment/assessment.php`;
const urluser = `${API_URL}/server/controller/user/user.php`;

export async function selectScoreUsers(score, id) {
  let item = { Type: "getScores" };
  let hotelId = { HotelId: id };
  let scorePrepare = { Score: score };
  let request = Object.assign(scorePrepare, hotelId, item);

  try {
    const params = await createParams(request);
    const response = await fetch(urlAssessment, params);

    let reader = await response.body.getReader().read();
    let body = new TextDecoder().decode(reader.value);
    if (body !== "0 datas") {
      let arrayIds = [];
      body = await JSON.parse(body);
      body.forEach((element) => {
        arrayIds.push(element);
      });
      userDates(arrayIds);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function selectAllUsers(idHotel) {
  let item = { getAllUsers: "getAllUsers" };
  let hotelId = { HotelId: idHotel };
  let request = Object.assign(hotelId, item);

  try {
    const params = await createParams(request);
    const response = await fetch(urlAssessment, params);
    let reader = await response.body.getReader().read();
    let body = new TextDecoder().decode(reader.value);
    if (body !== "0 datas") {
      let arrayIds = [];
      body = await JSON.parse(body);
      body.forEach((element) => {
        arrayIds.push(element);
      });
      userDates(arrayIds);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function userDates($datas) {
  let item = { Type: "Dates" };
  let dates = { Datas: $datas };
  let request = Object.assign(dates, item);

  try {
    const params = await createParams(request);
    const response = await fetch(urluser, params);
    const result = await response.json();
    let arrayDates = [];
    for (const date of result) {
      let Date = date[0].DateOfBirth;
      let dateSplit = Date.split("-");
      arrayDates.push(parseInt(dateSplit[0]));
    }
    arrayDates.sort();
    console.log(arrayDates);
    return arrayDates;
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
