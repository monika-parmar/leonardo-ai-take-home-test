import Information from "@/app/dashboard/information/page";
import { useUserInfoContext } from "@/context/UserInfoContext";
import { GET_CHARACTERS } from "@/graphql/query";
import { MockedProvider } from "@apollo/client/testing";
import { ChakraProvider, useBreakpointValue } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/context/UserInfoContext", () => ({
  useUserInfoContext: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: jest.fn(),
}));

const mockUseBreakpointValue = useBreakpointValue as jest.Mock;

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          results: [
            { id: 1, name: "Character 1" },
            { id: 2, name: "Character 2" },
          ],
          info: { pages: 5 },
        },
      },
    },
  },
];

describe("Information Component", () => {
  const mockPush = jest.fn();
  const mockUseSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
  });

  const renderComponent = () =>
    render(
      <ChakraProvider>
        <MockedProvider
          mocks={mocks}
          addTypename={false}
        >
          <Information />
        </MockedProvider>
      </ChakraProvider>
    );

  it("displays loading while waiting for the response", () => {
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { page: 1 },
        },
        errors: [new Error("Something went wrong")],
      },
    ];
    const mockClearUserInfo = jest.fn();
    (useUserInfoContext as jest.Mock).mockReturnValue({
      username: "john",
      jobTitle: "developer",
      clearUserInfo: mockClearUserInfo,
    });

    render(
      <ChakraProvider>
        <MockedProvider
          mocks={errorMocks}
          addTypename={false}
        >
          <Information />
        </MockedProvider>
      </ChakraProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders character cards when data is successfully fetched", async () => {
    renderComponent();
    mockUseBreakpointValue.mockReturnValue(false);
    // Wait for the data to load
    const character1 = await screen.findByText("Character 1");
    const character2 = await screen.findByText("Character 2");

    expect(character1).toBeInTheDocument();
    expect(character2).toBeInTheDocument();
  });

  it("calls handlePageChange and updates the URL when pagination changes", async () => {
    renderComponent();
    const user = userEvent.setup();

    const nextButton = await screen.findByText("Next");
    await user.click(nextButton);

    // Check that the page has changed and router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/dashboard/information?page=2");
  });
});
