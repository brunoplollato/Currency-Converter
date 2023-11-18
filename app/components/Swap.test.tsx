import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Swap from "./Swap";

// Test case for rendering Swap component
test("renders Swap component", () => {
  // Mock function for onClick
  const handleClick = jest.fn();

  render(<Swap onClick={handleClick} />);

  // Check if the button element is rendered
  const buttonElement = screen.getAllByRole("button");
  expect(buttonElement[0]).toBeInTheDocument();

  // Check if the SVG element is rendered
  const svgElement = screen.getByTestId("swap-icon");
  expect(svgElement).toBeInTheDocument();
});

// Test case for clicking the Swap button
test("calls onClick when Swap button is clicked", () => {
  // Mock function for onClick
  const handleClick = jest.fn();

  render(<Swap onClick={handleClick} />);

  // Click the Swap button
  const buttonElement = screen.getAllByRole("button");
  fireEvent.click(buttonElement[0]);

  // Check if onClick is called
  expect(handleClick).toHaveBeenCalled();
});
