import { React } from "react";
import { map } from "lodash";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import "./scss/Foods.scss";
export default function Foods(props) {
  const { foods } = props;
  return (
    <div className="foods">
      {foods !== null ? (
        <div className="contentFoods">
          {map(foods, (index, value) => (
            <div className="foodContent" key={value}>
              <RestaurantRoundedIcon className="infoFood" />
              <p className="infoFood">{index.Type}</p>
              <p className="infoFood">{index.Price} €</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
