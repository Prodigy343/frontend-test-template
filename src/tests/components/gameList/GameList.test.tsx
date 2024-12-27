import { render, screen, fireEvent } from "@testing-library/react";
import GameList from "@/components/gameList/index";
import { mockGames } from "@/tests/dataMocks";

describe("GameList Component", () => {
  const mockCartMap = new Map<string, boolean>([["1", true]]);
  const mockOnAddToCart = jest.fn();
  const mockOnRemoveFromCart = jest.fn();

  it("renders a list of games", () => {
    render(
      <GameList
        games={mockGames}
        cartMap={mockCartMap}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
      expect(screen.getByText(game.genre)).toBeInTheDocument();
      expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
    });
  });

  it("calls onAddToCart when 'Add to Cart' is clicked for a game not in the cart", () => {
    render(
      <GameList
        games={mockGames}
        cartMap={mockCartMap}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const addButton = screen.getAllByText("ADD TO CART")[0];
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockGames[1]);
  });

  it("calls onRemoveFromCart when 'Remove from Cart' button is clicked for a game in the cart", () => {
    render(
      <GameList
        games={mockGames}
        cartMap={mockCartMap}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const removeButton = screen.getByText("REMOVE FROM CART");
    fireEvent.click(removeButton);
    expect(mockOnRemoveFromCart).toHaveBeenCalledWith(mockGames[0]);
  });
});