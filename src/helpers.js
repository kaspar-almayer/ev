export const filterNewCars = (car) =>
  car.attributes["pochodzenie-pojazdu"] === "NOWY ZAKUPIONY W KRAJU" ||
  car.attributes["pochodzenie-pojazdu"] === "NOWY IMPORT INDYW";

export const donutColors = [
  "#5A43EE",
  "#F68927",
  "#F44B69",
  "#5BDC63",
  "tomato",
  "gray",
];

export const yearDonutColors = [
  "#5A43EE",
  "#F68927",
  "#F44B69",
  "#5BDC63",
  "tomato",
  "#DFC89F",
  "#772875",
  "#133739",
  "#30913C",
  "#A46A37",
  "gray",
];

export const modelUnify = (model) => {
  switch (model) {
    case "LEAF 40KWH":
      return "LEAF";
    case "TAYCAN TURBO":
      return "TAYCAN";
    case "TAYCAN 4S":
      return "TAYCAN";
    case "TAYCAN TURBO S":
      return "TAYCAN";
    case "I3S":
      return "I3";
    case "E-TRON 50":
      return "E-TRON";
    case "E-TRON 55":
      return "E-TRON";
    case "E-TRON SPORTBACK 55":
      return "E-TRON";
    case "E-TRON SPORTBACK 50":
      return "E-TRON";

    default:
      return model;
  }
};

export const getMonthName = (month) => {
  return new Date(2020, month - 1, 1).toLocaleDateString("pl-pl", {
    year: "numeric",
    month: "long",
    //day: "numeric",
  });
};
