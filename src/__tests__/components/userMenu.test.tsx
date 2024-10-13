import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserMenu from "@/components/UserMenu";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUserInfoContext } from "@/context/UserInfoContext";
import { capitalizeFirstLetter } from "@/lib/capitaliseFirstCharacter";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn().mockReturnValue({ onOpen: jest.fn() }),
  useBreakpointValue: jest.fn().mockReturnValue("md"), // Avoid testing responsive behavior
}));

jest.mock("@/context/UserInfoContext", () => ({
  useUserInfoContext: jest.fn(),
}));

jest.mock("@/components/AuthModal", () => jest.fn(() => <div>AuthModal</div>));

jest.mock("@/lib/capitaliseFirstCharacter", () => ({
  capitalizeFirstLetter: jest.fn((str) => str),
}));

describe("UserMenu Component", () => {
  const renderComponent = () => {
    return render(
      <ChakraProvider>
        <UserMenu />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock scrollTo for elements
  beforeAll(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  it("renders avatar and username/jobTitle correctly", () => {
    const mockClearUserInfo = jest.fn();
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: mockClearUserInfo,
    });

    renderComponent();

    expect(screen.getByText("john")).toBeInTheDocument();
    expect(screen.getByText("developer")).toBeInTheDocument();
  });

  it("opens the profile settings modal when 'Profile Settings' is clicked", async () => {
    const user = userEvent.setup();
    const mockClearUserInfo = jest.fn();
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: mockClearUserInfo,
    });

    renderComponent();

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Profile Settings"));

    expect(screen.getByText("AuthModal")).toBeInTheDocument();
  });

  it("logs the user out and navigates to '/' when 'Logout' is clicked", async () => {
    const user = userEvent.setup();
    const mockClearUserInfo = jest.fn();
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: mockClearUserInfo,
    });

    renderComponent();

    await user.click(screen.getByRole("button")); // Open the menu
    await user.click(screen.getByText("Logout")); // Click logout

    expect(mockClearUserInfo).toHaveBeenCalled(); // Check if clearUserInfo was called
    expect(mockReplace).toHaveBeenCalledWith("/"); // Check if router.replace was called with "/"
  });

  it("capitalizes the username and jobTitle using capitalizeFirstLetter function", () => {
    const mockClearUserInfo = jest.fn();
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: mockClearUserInfo,
    });
    (capitalizeFirstLetter as jest.Mock).mockImplementation(
      (str) => `Capitalized(${str})`
    );

    renderComponent();

    expect(capitalizeFirstLetter).toHaveBeenCalledWith("john");
    expect(capitalizeFirstLetter).toHaveBeenCalledWith("developer");
    expect(screen.getByText("Capitalized(john)")).toBeInTheDocument();
    expect(screen.getByText("Capitalized(developer)")).toBeInTheDocument();
  });

  it("calls onOpen when the MenuButton is clicked", async () => {
    const user = userEvent.setup();
    const mockOnOpen = jest.fn();
    (useDisclosure as jest.Mock).mockReturnValue({ onOpen: mockOnOpen });
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: jest.fn(),
    });

    renderComponent();

    await user.click(screen.getByRole("button"));
    expect(mockOnOpen).toHaveBeenCalled();
  });
});
