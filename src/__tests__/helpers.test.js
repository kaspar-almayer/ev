import React from "react";
import { filterNewCars, getMonthName } from "../helpers";

test("filters new cars", () => {
  const newCar = {
    attributes: { "pochodzenie-pojazdu": "NOWY ZAKUPIONY W KRAJU" },
  };
  const usedCar = {
    attributes: { "pochodzenie-pojazdu": "IMPORT WŁASNY" },
  };
  expect(filterNewCars(newCar)).toBe(true);
  expect(filterNewCars(usedCar)).toBe(false);
});

test("return correct month", () => {
  const monthsCodes = [1, 2, 3, 4, 15];
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", ""];
  monthsCodes.forEach((code, index) =>
    expect(getMonthName(code)).toBe(monthNames[index])
  );
});
