import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "../../components/Nav";

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) => {
    return <div onClick={() => mockPush(href)}>{children}</div>;
  }
}));

describe("Nav", () => {
  it("renders correctly", () => {
    render(<Nav />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Mindmapper")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("toggles navigation on click", () => {
    render(<Nav />);

    const navToggleButton = screen.getByRole("button");
    fireEvent.click(navToggleButton);

    // Replace 'Navigation Item' with the actual text of a navigation item
    expect(screen.getByText("Home")).toBeVisible();
  });

  it("should navigate to the correct page when link is clicked", () => {
    render(<Nav />);

    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
