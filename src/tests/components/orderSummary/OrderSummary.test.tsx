import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderSummary } from "@/components/orderSummary/index";
import { mockGames } from "@/tests/dataMocks";

describe("OrderSummary Component", () => {
  it("renders the component correctly with games", () => {
    render(<OrderSummary games={mockGames} />);

    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/3 items/i)).toBeInTheDocument();

    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
      expect(screen.getByText(`$${game.price.toFixed(2)}`)).toBeInTheDocument();
    });

    const totalPrice = mockGames.reduce((total, game) => total + game.price, 0);
    expect(screen.getByText(`$${totalPrice.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Checkout/i })).toBeInTheDocument();
  });

  it("renders correctly with an empty games list", () => {
    render(<OrderSummary games={[]} />);

    expect(screen.getByText(/0 items/i)).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Checkout/i })).toBeInTheDocument();
  });

  it("handles button interaction", async () => {
    const user = userEvent.setup();
    render(<OrderSummary games={mockGames} />);

    const button = screen.getByRole("button", { name: /Checkout/i });
    await user.click(button);

    expect(button).toBeEnabled();
  });
});