import { React, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

import { getAllNames, deleteUser } from "./../../../api/user";
import { API_URL } from "./../../../utils/constant";
import "./scss/UserTable.scss";
import { toast } from "react-toastify";
import { map } from "lodash";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

export default function UserTable() {
  const [userNames, setUserNames] = useState(null);
  const [userImages, setUserImages] = useState(null);

  const initialDatas = async () => {
    let response = await getAllNames();
    setUserNames(response);
  };

  const deletUserEmail = async (email) => {
    let item = { user: email };
    let response = await deleteUser(item);
  };

  useEffect(() => {
    initialDatas();
  }, []);

  console.log(userNames);
  return (
    <div>
      <ListGroup>
        {map(userNames, (index, value) => (
          <ListGroup.Item key={value} className="contentInfoUA">
            <span className="infoUserFA"> {index.Name} </span>{" "}
            {index.ProfileImage === null ? (
              <img
                className="imgProfileUA"
                src={`${API_URL}/server/images/userDefault.jpeg`}
                alt=""
              />
            ) : null}
            {index.ProfileImage !== null ? (
              <img
                className="imgProfileUA"
                src={`${API_URL}/server/images/${index.ProfileImage}`}
                alt=""
              />
            ) : null}
            <span className="infoUserFA"> {index.Email} </span>
            <button onClick={() => deletUserEmail(index.Email)}>
              <DeleteRoundedIcon className="deleteIcon" />
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
