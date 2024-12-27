import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderListItem from "@/components/orderList/OrderListItem";
import { mockGames } from "@/tests/dataMocks";

describe("OrderListItem Component", () => {
  const gameMock = mockGames[0];
  let mockOnRemove: jest.Mock;

  beforeEach(() => {
    mockOnRemove = jest.fn();
  });

  it("renders the component correctly", () => {
    render(<OrderListItem {...gameMock} onRemove={mockOnRemove}/>);

    expect(screen.getByText(gameMock.genre)).toBeInTheDocument();
    expect(screen.getByText(gameMock.name)).toBeInTheDocument();
    expect(screen.getByText(gameMock.description)).toBeInTheDocument();
    expect(screen.getByText(`$${gameMock.price.toFixed(2)}`)).toBeInTheDocument();

    const removeButton = screen.getByRole("button", { name: /^remove item$/i });
    expect(removeButton).toBeInTheDocument();
  });

  it("handles onRemove callback when the remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<OrderListItem {...gameMock} onRemove={mockOnRemove}/>);

    const removeButton = screen.getByRole("button", { name: /^remove item$/i });
    await user.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("handles rendering correctly without a description", () => {
    const { description, ...propsWithoutDescription } = gameMock;
    render(<OrderListItem {...propsWithoutDescription} onRemove={mockOnRemove}/>);

    expect(screen.queryByText(description)).not.toBeInTheDocument();
  });
});