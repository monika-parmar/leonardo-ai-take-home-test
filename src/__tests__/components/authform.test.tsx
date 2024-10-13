import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "@/components/AuthForm";

describe("AuthForm", () => {
  const mockOnInputChange = jest.fn();

  const renderComponent = (username = "", jobTitle = "") => {
    render(
      <AuthForm username={username} jobTitle={jobTitle} onInputChange={mockOnInputChange} />
    );
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it("renders the input fields with the correct initial values", () => {
    renderComponent("testuser", "Developer");

    expect(screen.getByLabelText("Username*")).toBeInTheDocument();
    expect(screen.getByLabelText("Username*")).toHaveValue("testuser");
    expect(screen.getByLabelText("Job Title*")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title*")).toHaveValue("Developer");
  });

  it("calls onInputChange when the username input is changed", async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText("Username*");
    await userEvent.type(usernameInput, "newuser");

    expect(mockOnInputChange).toHaveBeenCalledTimes(7); // 7 letters for "newuser"
    expect(mockOnInputChange).toHaveBeenCalledWith("username", expect.anything()); // Ensure the correct field is updated
  });

  it("calls onInputChange when the job title input is changed", async () => {
    renderComponent();

    const jobTitleInput = screen.getByLabelText("Job Title*");
    await userEvent.type(jobTitleInput, "Manager");

    expect(mockOnInputChange).toHaveBeenCalledTimes(7); // 7 letters for "Manager"
    expect(mockOnInputChange).toHaveBeenCalledWith("jobTitle", expect.anything()); // Ensure the correct field is updated
  });

  it("does not call onInputChange when the inputs are empty", async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText("Username*");
    const jobTitleInput = screen.getByLabelText("Job Title*");

    // Clear inputs
    await userEvent.clear(usernameInput);
    await userEvent.clear(jobTitleInput);

    expect(mockOnInputChange).not.toHaveBeenCalled();
  });
});
