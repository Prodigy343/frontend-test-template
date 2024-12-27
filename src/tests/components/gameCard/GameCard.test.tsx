import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "@/components/gameCard/index";
import { mockGames } from "@/tests/dataMocks";

describe("GameCard Component", () => {
  const mockGame = mockGames[0];
  const mockOnAddToCart = jest.fn();
  const mockOnRemoveFromCart = jest.fn();

  it("renders game details correctly", () => {
    render(
      <GameCard
        game={mockGame}
        alreadySelected={false}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    expect(screen.getByText(mockGame.genre)).toBeInTheDocument();
    expect(screen.getByText(`$${mockGame.price}`)).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("ADD TO CART")).toBeInTheDocument();
  });

  it("calls onAddToCart when the 'Add to Cart' button is clicked", () => {
    render(
      <GameCard
        game={mockGame}
        alreadySelected={false}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    fireEvent.click(screen.getByText("ADD TO CART"));
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockGame);
  });

  it("renders 'Remove from Cart' button when alreadySelected is true", () => {
    render(
      <GameCard
        game={mockGame}
        alreadySelected={true}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByText("REMOVE FROM CART")).toBeInTheDocument();
  });

  it("calls onRemoveFromCart when the 'Remove from Cart' button is clicked", () => {
    render(
      <GameCard
        game={mockGame}
        alreadySelected={true}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    fireEvent.click(screen.getByText("REMOVE FROM CART"));
    expect(mockOnRemoveFromCart).toHaveBeenCalledWith(mockGame);
  });
});