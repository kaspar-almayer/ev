import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";

test("renders header", () => {
  const { getByText } = render(<Header />);
  const title = "Voltauto.pl";
  const subTitle = "Rynek samochodów elektrycznych w Polsce";
  const titleElement = getByText(title);
  const subTitleElement = getByText(subTitle);
  expect(titleElement).toBeInTheDocument();
  expect(subTitleElement).toBeInTheDocument();
});
