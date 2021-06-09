import { React, useState, useEffect } from "react";
import "./scss/Analytics.scss";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

import { FormControl } from "react-bootstrap";
import { selectScoreUsers, selectAllUsers } from "./functionAnalytics";

export default function Analytics(props) {
  const { idHotel } = props;

  const data = [
    { name: "Facebook", users: 2000000000 },
    { name: "Instagram", users: 1500000000 },
    { name: "Twiter", users: 1000000000 },
    { name: "Telegram", users: 500000000 },
  ];

  const [rangeData, setRangeData] = useState(null);
  const [myHotelId, setMyHotelId] = useState(null);

  const onChangeSelectScore = async (e) => {
    let res = await selectScoreUsers(e.target.value, myHotelId[0].IdHotel);
  };

  useEffect(() => {
    setMyHotelId(idHotel);
    const prepareDatas = async () => {
      console.log("Entramos");
      let res2 = await selectAllUsers(idHotel[0].IdHotel);
    };
    prepareDatas();
  }, [idHotel]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="containerScore">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <div>
          <span>Select scrore</span>
          <FormControl
            as="select"
            id="selectScore"
            onChange={(e) => {
              onChangeSelectScore(e);
            }}
          >
            <option className="optionSelectScore" value="1">
              1
            </option>
            <option className="optionSelectScore" value="2">
              2
            </option>
            <option className="optionSelectScore" value="3">
              3
            </option>
            <option className="optionSelectScore" value="4">
              4
            </option>
            <option className="optionSelectScore" value="5">
              5
            </option>
            <option className="optionSelectScore" value="6">
              6
            </option>
            <option className="optionSelectScore" value="7">
              7
            </option>
            <option className="optionSelectScore" value="8">
              8
            </option>
            <option className="optionSelectScore" value="9">
              9
            </option>
            <option className="optionSelectScore" value="10">
              10
            </option>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
