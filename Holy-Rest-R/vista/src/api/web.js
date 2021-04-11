export const getColorStorage = () => {
  let color = "";
  color = localStorage.getItem("Color");
  return color;
};

export const setColorStorage = (color) => {
  localStorage.setItem("Color", color);
};

export const whatColorStorage = () => {
  const colorSave = getColorStorage();

  if (!colorSave) {
    return "null";
  } else {
    console.log(colorSave);
    return colorSave;
  }
};
