import React from "react";
import { render, screen } from "@testing-library/react"
import App from "./App";

test("renders double(2)", () => {
  render(<App />);
  expect(screen.getByText("4")).toBeInTheDocument();
});
