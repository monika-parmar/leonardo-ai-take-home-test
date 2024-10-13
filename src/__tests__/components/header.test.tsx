import { render, screen } from "@testing-library/react";
import { ChakraProvider, useBreakpointValue } from "@chakra-ui/react";
import Header from "@/components/Header";
import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import UserMenu from "@/components/UserMenu";

// Mock the UserMenu component and the useAuthStatusCheck hook
jest.mock("@/components/UserMenu");
jest.mock("@/hooks/useAuthStatusCheck");
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: jest.fn(),
}));

const mockUseAuthStatusCheck = useAuthStatusCheck as jest.Mock;

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithChakra = (ui: React.ReactElement) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
  };

  it("shows user avatar only on mobile", () => {
    // Mock useBreakpointValue to return true for mobile view
    (useBreakpointValue as jest.Mock).mockReturnValue(true);

    mockUseAuthStatusCheck.mockReturnValue({ isValidUser: true });
    renderWithChakra(<Header />);

    // Check if UserMenu is rendered with avatarOnly prop as true
    expect(UserMenu).toHaveBeenCalledWith(
      expect.objectContaining({ avatarOnly: true }),
      {}
    );
  });

  it("shows user avatar only on larger screens", () => {
    // Mock useBreakpointValue to return false for larger screens
    (useBreakpointValue as jest.Mock).mockReturnValue(false);

    mockUseAuthStatusCheck.mockReturnValue({ isValidUser: true });
    renderWithChakra(<Header />);

    // Check if UserMenu is rendered with avatarOnly prop as false
    expect(UserMenu).toHaveBeenCalledWith(
      expect.objectContaining({ avatarOnly: false }),
      {}
    );
  });

  it("hides company name on mobile", () => {
    (useBreakpointValue as jest.Mock).mockReturnValue(true); // Mock as mobile
    mockUseAuthStatusCheck.mockReturnValue({ isValidUser: false });
    renderWithChakra(<Header />);

    // Check if the company name is not in the document
    expect(screen.queryByText(/leonardo\.ai/i)).not.toBeInTheDocument();
  });

  it("shows company name on larger screens", () => {
    (useBreakpointValue as jest.Mock).mockReturnValue(false); // Mock as desktop
    mockUseAuthStatusCheck.mockReturnValue({ isValidUser: false });
    renderWithChakra(<Header />);

    // Check if the company name is in the document
    expect(screen.getByText(/leonardo\.ai/i)).toBeInTheDocument();
  });
});
