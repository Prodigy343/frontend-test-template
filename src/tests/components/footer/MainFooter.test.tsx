import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { MainFooter } from "@/components/footer/MainFooter";

describe("MainFooter", () => {
  it("renders the footer with the Apply Digital logo", () => {
    render(<MainFooter />);

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: /apply digital/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");

    const logoImage = screen.getByAltText("Apply Digital");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/images/apply-logo.svg");
  });
});