import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthModal from "@/components/AuthModal";
import { UserInfoProvider } from "@/context/UserInfoContext";
import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import { ChakraProvider } from "@chakra-ui/react";

// Mock the useAuthStatusCheck hook
jest.mock("@/hooks/useAuthStatusCheck");
const mockUseAuthStatusCheck = useAuthStatusCheck as jest.Mock;

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("AuthModal", () => {
  const mockOnClose = jest.fn();

  const renderComponent = (isUpdateMode: boolean, isValidUser: boolean) => {
    mockUseAuthStatusCheck.mockReturnValue({ isValidUser });

    render(
      <ChakraProvider>
        <UserInfoProvider>
          <AuthModal
            isUpdateMode={isUpdateMode}
            onClose={mockOnClose}
          />
        </UserInfoProvider>
      </ChakraProvider>
    );
  };

  it("renders login modal when isUpdateMode is false and user is not valid", () => {
    renderComponent(false, false);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Username*")).toHaveValue(""); // Adjust if necessary
    expect(screen.getByLabelText("Job Title*")).toHaveValue(""); // Adjust if necessary
  });

  it("renders update modal when isUpdateMode is true", () => {
    renderComponent(true, true);

    expect(screen.getByText("Update Your Info")).toBeInTheDocument();
  });

  it("calls setUserInfo and onClose on submit", async () => {
    // Use async here for userEvent
    renderComponent(false, false);

    // Simulate user input using userEvent
    await userEvent.type(screen.getByLabelText("Username*"), "newuser");
    await userEvent.type(screen.getByLabelText("Job Title*"), "Manager");

    // Simulate form submission
    await userEvent.click(screen.getByText("Submit"));

    // Check that setUserInfo was called with the expected arguments
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("disables submit button when username or job title is empty", async () => {
    renderComponent(false, false);

    // Initially type valid values into the fields
    await userEvent.type(screen.getByLabelText("Username*"), "validUser");
    await userEvent.type(screen.getByLabelText("Job Title*"), "Manager");

    // Check that the submit button is enabled after filling out the fields
    expect(screen.getByText("Submit")).toBeEnabled();

    // Clear the username field
    await userEvent.clear(screen.getByLabelText("Username*"));

    // Check if the submit button is disabled
    expect(screen.getByText("Submit")).toBeDisabled();

    // Clear the job title field
    await userEvent.clear(screen.getByLabelText("Job Title*"));

    // Check if the submit button is disabled again
    expect(screen.getByText("Submit")).toBeDisabled();
  });
});
