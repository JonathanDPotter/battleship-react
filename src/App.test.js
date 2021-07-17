import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";

test("renders game title", () => {
  render(<App />);
  expect(screen.getByTestId("game-title").textContent).toBe("Battleship");
});

xtest("renders ship name when ships are being placed", () => {
  render(<App />);
  expect(screen.getByText("Aircraft Carrier")).toBeInTheDocument();
  App.nextShip();
  App.nextShip();
  expect(screen.getByText("Cruiser")).toBeInTheDocument();
});
