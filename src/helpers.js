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

export const getMonthName = (month) => {
  switch (month) {
    case 1:
      return "Styczeń 2019";
    case 2:
      return "Luty 2019";
    case 3:
      return "Marzec 2019";
    case 4:
      return "Kwiecień 2019";
    case 5:
      return "Maj 2019";
    case 6:
      return "Czerwiec 2019";
    case 7:
      return "Lipiec 2019";
    case 8:
      return "Sierpień 2019";
    case 9:
      return "Wrzesień 2019";
    case 10:
      return "Pażdziernik 2019";
    case 11:
      return "Listopad 2019";
    case 12:
      return "Grudzień 2019";
    case 13:
      return "Styczeń 2020";
    case 14:
      return "Luty 2020";
    case 15:
      return "Marzec 2020";
    case 16:
      return "Kwiecień 2020";
    case 17:
      return "Maj 2020";
    case 18:
      return "Czerwiec 2020";
    case 19:
      return "Lipiec 2020";
    case 20:
      return "Sierpień 2020";
    case 21:
      return "Wrzesień 2020";
    case 22:
      return "Pażdziernik 2020";
    case 23:
      return "Listopad 2020";
    case 24:
      return "Grudzień 2020";
    default:
      return "";
  }
};
