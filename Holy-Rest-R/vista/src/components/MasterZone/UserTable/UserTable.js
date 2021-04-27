import { React, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

import { getAllNames } from "./../../../api/user";
import "./scss/UserTable.scss";
import { toast } from "react-toastify";
import { map } from "lodash";

export default function UserTable() {
  const [userNames, setUserNames] = useState(null);
  const [userImages, setUserImages] = useState(null);

  const initialDatas = async () => {
    let response = await getAllNames();
    setUserNames(response);
  };

  useEffect(() => {
    initialDatas();
  }, []);

  console.log(userNames);
  return (
    <div>
      <ListGroup>
        {map(userNames, (index, value) => (
          <ListGroup.Item key={value}>{index.Name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
