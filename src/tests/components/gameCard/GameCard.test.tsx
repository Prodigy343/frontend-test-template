import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import GameCard from "@/components/gameCard/index";
import { mockGames } from '@/tests/dataMocks';

describe("GameCard", () => {
  const mockGame = mockGames[0];
  const mockOnAddToCart = jest.fn();

  it("renders game details correctly", () => {
    render(<GameCard game={mockGame} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    expect(screen.getByText(mockGame.genre)).toBeInTheDocument();
    expect(screen.getByText(`$${mockGame.price}`)).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();

    const gameImage = screen.getByAltText(mockGame.name);
    expect(gameImage).toBeInTheDocument();
    expect(gameImage).toHaveAttribute("src");
    expect(gameImage.getAttribute("src")).toContain(encodeURIComponent(mockGame.image));
  });

  it("handles the 'Add to Cart' interaction", () => {
    render(<GameCard game={mockGame} onAddToCart={mockOnAddToCart} />);

    const addToCartButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockGame);
  });

  it("does not render the 'New' badge for non-new games", () => {
    const updatedMockGame = { ...mockGame, isNew: false };
    render(<GameCard game={updatedMockGame} onAddToCart={mockOnAddToCart} />);

    const newBadge = screen.queryByText("New");
    expect(newBadge).not.toBeInTheDocument();
  });
});