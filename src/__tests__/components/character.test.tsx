import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Character from "@/components/Character";
import { ChakraProvider } from "@chakra-ui/react";

// Mock the CharacterModal component
jest.mock("@/components/CharacterModal", () => {
  return function MockCharacterModal({
    isOpen,
    onClose,
    character,
  }: CharacterModalProps) {
    return (
      <div>
        {isOpen && (
          <div
            role='dialog'
            aria-labelledby='modal-title'
          >
            <h1 id='modal-title'>{character.name}</h1>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    );
  };
});

describe("Character", () => {
  const character: CharacterResults = {
    id: 1,
    name: "Test Character",
    status: null,
    image: "test-image-url",
    species: "Test Species",
    type: null,
    gender: "Test Gender",
    origin: "Test Origin",
  };

  const renderComponent = () => {
    render(
      <ChakraProvider>
        <Character character={character} />
      </ChakraProvider>
    );
  };

  it("renders character details", () => {
    renderComponent();

    expect(screen.getByText("Test Character")).toBeInTheDocument();
    expect(screen.getByText("Test Species")).toBeInTheDocument();
    expect(screen.getByAltText("Test Character")).toHaveAttribute(
      "src",
      "test-image-url"
    );
  });

  it("opens the modal on character click", async () => {
    renderComponent();

    // Click on the character box to open the modal
    await userEvent.click(screen.getByText("Test Character"));

    // Check if the modal is open by looking for an element in the modal
    const modalTitle = await screen.findByRole("heading", {
      name: /test character/i,
    }); // Use role to find the heading
    expect(modalTitle).toBeInTheDocument(); // Verify that the modal title is present in the document
  });

  it("closes the modal when the close button is clicked", async () => {
    renderComponent();

    // Open the modal
    await userEvent.click(screen.getByText("Test Character"));

    // Close the modal
    expect(screen.getByRole("dialog")).toBeInTheDocument(); // Modal should be open
    await userEvent.click(screen.getByText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); // Modal should be closed
  });
});
