import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

// Test case for rendering Input component
test("renders Input component", () => {
  render(
    <Input
      value=""
      onChange={() => {}}
      dropdownItems={["USD", "EUR", "GBP"]}
      selectedItem="USD"
      onDropdownChange={() => {}}
      disabled={false}
    />,
  );

  // Check if the input element is rendered
  const inputElement = screen.getByPlaceholderText(/00,00/i);
  expect(inputElement).toBeInTheDocument();

  // Check if the dropdown button is rendered
  const dropdownButton = screen.getAllByRole("button", { name: /usd/i });
  expect(dropdownButton[0]).toBeInTheDocument();
});

// Test case for toggling dropdown
test("toggles dropdown on button click", () => {
  render(
    <Input
      value=""
      onChange={() => {}}
      dropdownItems={["USD", "EUR", "GBP"]}
      selectedItem="USD"
      onDropdownChange={() => {}}
      disabled={false}
    />,
  );

  // Check if the dropdown is initially closed
  const dropdown = screen.getByTestId("dropdown");
  expect(dropdown).toHaveStyle({ maxHeight: "0px" });

  // Click the dropdown button
  const dropdownButton = screen.getAllByRole("button", { name: /usd/i });
  fireEvent.click(dropdownButton[0]);

  // Check if the dropdown is open after the click
  expect(dropdown).toHaveStyle({ maxHeight: "300px" });

  // Click the dropdown button again
  fireEvent.click(dropdownButton[0]);

  // Check if the dropdown is closed after the second click
  expect(dropdown).toHaveStyle({ maxHeight: "0px" });
});

// Test case for selecting dropdown item
test("selects dropdown item on item click", () => {
  // Mock function for onDropdownChange
  const handleDropdownChange = jest.fn();

  render(
    <Input
      value=""
      onChange={() => {}}
      dropdownItems={["USD", "EUR", "GBP"]}
      selectedItem="USD"
      onDropdownChange={handleDropdownChange}
      disabled={false}
    />,
  );

  // Click the dropdown button
  const dropdownButton = screen.getAllByRole("button", { name: /usd/i });
  fireEvent.click(dropdownButton[0]);

  // Click a dropdown item
  const dropdownItem = screen.getByText(/eur/i);
  fireEvent.click(dropdownItem);

  // Check if onDropdownChange is called with the correct value
  expect(handleDropdownChange).toHaveBeenCalledWith(expect.any(Object));
});

// Test case for disabled input
test("disables input when disabled prop is true", () => {
  render(
    <Input
      value=""
      onChange={() => {}}
      dropdownItems={["USD", "EUR", "GBP"]}
      selectedItem="USD"
      onDropdownChange={() => {}}
      disabled={true}
    />,
  );

  // Check if the input is disabled
  const inputElement = screen.getByPlaceholderText(/00,00/i);
  expect(inputElement).toBeDisabled();
});
