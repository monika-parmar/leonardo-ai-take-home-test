import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/Header";
import UserMenu from "@/components/UserMenu";

// Mock the UserMenu component
jest.mock("@/components/UserMenu");

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithChakra = (ui: React.ReactElement) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
  };

  it("renders the company logo", () => {
    renderWithChakra(<Header />);
    const logo = screen.getByAltText(/leonardo\.ai/i);
    expect(logo).toBeInTheDocument();
  });

  it("navigates to the Information page when the Information link is clicked", () => {
    renderWithChakra(<Header />);
    const informationLink = screen.getByText(/information/i);
    expect(informationLink).toHaveAttribute("href", "/dashboard/information");
  });

  it("renders the UserMenu component", () => {
    renderWithChakra(<Header />);
    expect(UserMenu).toHaveBeenCalled();
  });
});
