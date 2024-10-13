import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterModal from "@/components/CharacterModal";

describe("CharacterModal Component", () => {
  const character: CharacterResults = {
    id: 1,
    name: "Test Character",
    status: "Alive",
    image: "test-image-url",
    species: "Test Species",
    type: null,
    gender: "Male",
    origin: "Earth",
  };

  it("renders the modal when isOpen is true", () => {
    render(
      <CharacterModal
        isOpen={true}
        onClose={jest.fn()}
        character={character}
      />
    );

    // Check if the modal is in the document
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays the character name correctly", () => {
    render(
      <CharacterModal
        isOpen={true}
        onClose={jest.fn()}
        character={character}
      />
    );

    // Check if the character name is displayed in the modal header
    expect(screen.getByText("Test Character")).toBeInTheDocument();
  });

  it("renders the character image", () => {
    render(
      <CharacterModal
        isOpen={true}
        onClose={jest.fn()}
        character={character}
      />
    );

    // Check if the character image is rendered
    const image = screen.getByAltText("Test Character");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", character.image);
  });

  it("displays character details correctly", () => {
    render(
      <CharacterModal
        isOpen={true}
        onClose={jest.fn()}
        character={character}
      />
    );

    // Check if character details are displayed
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();

    expect(screen.getByText("Species")).toBeInTheDocument();
    expect(screen.getByText("Test Species")).toBeInTheDocument();

    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument(); // Since type is null

    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", async () => {
    const onClose = jest.fn(); // Mock the onClose function
    render(
      <CharacterModal
        isOpen={true}
        onClose={onClose}
        character={character}
      />
    );

    // Ensure the modal is in the document initially
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Verify the onClose function was called
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
