import { render, screen } from "@testing-library/react";
import Index from "pages/index";

describe("Index", () => {
  it("renders name ", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /Thomas Lloyd-Jones/
    });

    expect(heading).toBeInTheDocument();
  });
});
