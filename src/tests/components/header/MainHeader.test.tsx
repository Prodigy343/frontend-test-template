import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { MainHeader } from "@/components/header/MainHeader";

describe("MainHeader", () => {
  it("renders the header with the GamerShop link", () => {
    render(<MainHeader />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const brandLink = screen.getByRole("link", { name: /gamershop/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders the navigation with a cart link", () => {
    render(<MainHeader />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();

    const cartLink = screen.getByRole("link", { name: /cart logo/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/cart");

    const cartImage = screen.getByAltText("cart logo");
    expect(cartImage).toBeInTheDocument();
    expect(cartImage).toHaveAttribute("src", "/images/cart.svg");
  });
});