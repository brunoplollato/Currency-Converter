import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "./page";

// Mock the FreeCurrencyAPI module
jest.mock("@everapi/freecurrencyapi-js", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      currencies: jest.fn(() => Promise.resolve({ data: { BRL: 5 } })),
      latest: jest.fn(() =>
        Promise.resolve({
          data: { BRL: 5 }, // Adjust with actual response structure
        }),
      ),
    })),
  };
});

// Test case for rendering Home component
test("renders Home component", async () => {
  render(<Home />);

  // Check if the heading is rendered
  const headingElement = screen.getByText(/Currency Converter/i);
  expect(headingElement).toBeInTheDocument();

  // Check if the first input element is rendered
  const firstInputElement = screen.getAllByPlaceholderText(/00,00/i)[0];
  expect(firstInputElement).toBeInTheDocument();

  // Check if the Swap button is rendered
  const swapButton = screen.getByTestId("swap-button");
  expect(swapButton).toBeInTheDocument();

  // Check if the second input element is rendered
  const secondInputElement = screen.getAllByPlaceholderText(/00,00/i)[1];
  expect(secondInputElement).toBeInTheDocument();

  // Check if the second input element is disabled
  expect(secondInputElement).toBeDisabled();

  // Mock asynchronous function calls to avoid act() warning
  await waitFor(() => {});
});

// Test case for swapping currencies
test("swaps currencies on Swap button click", async () => {
  render(<Home />);

  // Mock asynchronous function calls to avoid act() warning
  await waitFor(() => {
    // Get initial state
    const firstInputValue = screen.getAllByPlaceholderText(/00,00/i)[0];
    const secondInputValue = screen.getAllByPlaceholderText(/00,00/i)[1];

    fireEvent.change(firstInputValue, { target: { value: '100' } })

    // Check if the initial values are as expected
    expect(firstInputValue).toHaveValue(100);
    // expect(secondInputValue).toHaveValue("500");

    // Mock a currency swap
    const swapButton = screen.getByTestId("swap-button");
    fireEvent.click(swapButton);

    // Check if the currencies are swapped
    expect(firstInputValue).toHaveValue("500");
    expect(secondInputValue).toHaveValue("100");

    // Restore the original fetch function
    jest.restoreAllMocks();
  });
});

// Add more test cases as needed
