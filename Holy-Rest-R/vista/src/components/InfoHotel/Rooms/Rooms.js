import { React } from "react";
import { map } from "lodash";
import AirlineSeatIndividualSuiteRoundedIcon from "@material-ui/icons/AirlineSeatIndividualSuiteRounded";
import "./scss/Rooms.scss";

export default function Rooms(props) {
  const { rooms } = props;
  return (
    <div className="rooms">
      {rooms !== null ? (
        <div className="contentRooms">
          {map(rooms, (index, value) => (
            <div className="foodContent" key={value}>
              <AirlineSeatIndividualSuiteRoundedIcon className="infoRooms" />
              <p className="infoRooms">{index.TypeRoom}</p>
              <p className="infoRooms">{index.RoomPrice} €</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
