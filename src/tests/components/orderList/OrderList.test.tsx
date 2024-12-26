import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderList from "@/components/orderList/index";
import { mockGames } from "@/tests/dataMocks";

describe("OrderList Component", () => {
  let mockHandleRemove: jest.Mock;

  beforeEach(() => {
    mockHandleRemove = jest.fn();
  });

  it("renders the component correctly with games", () => {
    render(<OrderList games={mockGames} handleRemove={mockHandleRemove} />);

    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
      expect(screen.getByText(game.genre)).toBeInTheDocument();
      expect(screen.getByText(game.description!)).toBeInTheDocument();
      expect(screen.getByText(game.price.toFixed(2))).toBeInTheDocument();
    });

    const gameItems = screen.getAllByRole("button", { name: /remove item/i });
    expect(gameItems).toHaveLength(mockGames.length);
  });

  it("calls handleRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<OrderList games={mockGames} handleRemove={mockHandleRemove} />);

    const removeButtons = screen.getAllByRole("button", { name: /remove item/i });
    await user.click(removeButtons[0]);

    expect(mockHandleRemove).toHaveBeenCalledTimes(1);
    expect(mockHandleRemove).toHaveBeenCalledWith(mockGames[0].id);
  });

  it("renders correctly with an empty games list", () => {
    render(<OrderList games={[]} handleRemove={mockHandleRemove} />);

    const gameItems = screen.queryAllByRole("button", { name: /remove item/i });
    expect(gameItems).toHaveLength(0);

    expect(screen.queryByText(/no games found/i)).not.toBeInTheDocument();
  });
});