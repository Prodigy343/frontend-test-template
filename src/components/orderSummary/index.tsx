import { Game } from "@/utils/endpoint";
import { FC } from "react";

interface OrderSummaryProps {
  games: Game[];
}

export const OrderSummary: FC<OrderSummaryProps> = ({ games }) => {
  const totalPrice = games.reduce((total, game) => total + game.price, 0);

  return (
    <>
      <div className="mx-auto mb-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        <p className="text-sm text-gray-600">{games.length} items</p>

        <div className="mt-4 space-y-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex justify-between text-gray-900 text-sm"
            >
              <span className="truncate max-w-[70%]">{game.name}</span>
              <span>${game.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="flex justify-between text-gray-900 font-semibold">
          <span>Order Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full py-5 bg-soft-gray text-white text-sm font-medium rounded-[8px] hover:bg-gray-800">
        Checkout
      </button>
    </>
  );
};