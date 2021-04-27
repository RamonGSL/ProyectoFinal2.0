import { React, useState } from "react";
import "./scss/MasterZone.scss";
//import { API_URL } from "./../../utils/constant";
import { Tabs, Tab } from "react-bootstrap";
import UserTable from "./UserTable/UserTable";
export default function MasterZone() {
  const [key, setKey] = useState("Users");
  return (
    <div className="ContainerMasterZone">
      <div className="TabControlMasterZone">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="Users" title="Users">
            <UserTable />
          </Tab>
          <Tab eventKey="Hotels" title="Hotels">
            <p>Hotels</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
