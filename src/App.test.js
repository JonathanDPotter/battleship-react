import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders game title", () => {
  render(<App />);
  expect(document.getElementById("game-title").textContent).toBe("Battleship");
});

test("renders ship name when ships are being placed", () => {
  render(<App />);
  const button = document.getElementById("orientation-toggle");
  const information = document.getElementById("information");
  expect(information.textContent).toBe("Place Aircraft Carrier Horizontally");
  button.click();
  expect(information.textContent).toBe("Place Aircraft Carrier Vertically");
});
