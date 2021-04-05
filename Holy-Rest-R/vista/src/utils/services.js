import axios from "axios";
import { toast } from "react-toastify";

const generateUrl = "http://localhost/PROYECTO/Holy-Rest-R/";
const UrlUser = generateUrl + "server/controller/user/user.php";

export const newUser = (newUser) => {
  console.log(UrlUser);
  const article = JSON.stringify({
    type: "newUser",
    datas: newUser,
  });
  axios
    .post(UrlUser, article)
    .then((response) => {
      console.log(response.data);

      if (response.data !== "new user Created") {
        toast.error(response.data);
      } else {
        toast.success("Your user has been created correctly");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Server error, try again later");
    });
};

export const loginUser = (datasUser) => {
  console.log(datasUser);
  const article = JSON.stringify({
    type: "loginUser",
    datas: datasUser,
  });

  axios
    .post(UrlUser, article)
    .then((response) => {
      console.log(response.data);
      if (response.data !== "Correct Login") {
        toast.error("Error, email or password are not valid");
      } else {
        toast.success("Correct Login");
        localStorage.setItem("Email", datasUser["Email"]);
        localStorage.setItem("Password", datasUser["Password"]);
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Server error, try again later");
    });
};

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
