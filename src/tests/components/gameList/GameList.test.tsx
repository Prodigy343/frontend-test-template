import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameList from "@/components/gameList";
import { mockGames } from "@/tests/dataMocks";

describe("GameList", () => {
  const mockOnAddToCart = jest.fn();

  it("renders all the games", () => {
    render(<GameList games={mockGames} onAddToCart={mockOnAddToCart} />);

    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
    });

    const gameCards = screen.getAllByRole("button", { name: /add to cart/i });
    expect(gameCards).toHaveLength(mockGames.length);
  });

  it("handles adding a game to the cart", async () => {
    render(<GameList games={mockGames} onAddToCart={mockOnAddToCart} />);

    const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await userEvent.click(addToCartButtons[0]);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockGames[0]);
  });
});