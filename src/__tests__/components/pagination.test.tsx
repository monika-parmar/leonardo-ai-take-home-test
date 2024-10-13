import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/Pagination";
import { ChakraProvider, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: jest.fn(),
}));

// Utility function to render the component with ChakraProvider
const renderComponent = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  return render(
    <ChakraProvider>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </ChakraProvider>
  );
};

describe("Pagination Component", () => {
  it("renders the correct number of buttons", () => {
    const onPageChange = jest.fn();
    renderComponent(1, 5, onPageChange);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables 'Previous' button on the first page", () => {
    const onPageChange = jest.fn();
    renderComponent(1, 5, onPageChange);

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("disables 'Next' button on the last page", () => {
    const onPageChange = jest.fn();
    renderComponent(5, 5, onPageChange);

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("renders '...' when there are too many pages", () => {
    // Mock useBreakpointValue to return true for mobile view
    (useBreakpointValue as jest.Mock).mockReturnValue(true);

    const onPageChange = jest.fn();
    renderComponent(10, 42, onPageChange);

    expect(screen.getAllByText("...").length).toBe(2); // Dots before and after the middle pages
  });

  it("renders mobile-friendly buttons", async () => {
    const user = userEvent.setup();
    // Mock useBreakpointValue to return mobile values
    (useBreakpointValue as jest.Mock).mockReturnValue(true);

    const onPageChange = jest.fn();
    renderComponent(1, 5, onPageChange);

    const prevButton = screen.getByText("◀️");
    const nextButton = screen.getByText("▶️");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    await user.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2); // Assuming the first click takes you to page 2
  });
});
