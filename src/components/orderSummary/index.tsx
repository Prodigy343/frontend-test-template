import { Game } from "@/utils/endpoint";
import { FC } from "react";

interface OrderSummaryProps {
  games: Game[];
}

export const OrderSummary: FC<OrderSummaryProps> = ({ games }) => {
  const totalPrice = games.reduce((total, game) => total + game.price, 0);

  return (
    <>
      <div className="mx-auto mb-6 px-6 py-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-gray-900">Order Summary</h2>
        <p className="text-lg text-gray-600 pb-12">{games.length} items</p>

        <div className="mt-6 space-y-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex justify-between text-gray-900 text-sm"
            >
              <span className="truncate max-w-[70%] text-lg">{game.name}</span>
              <span className="text-lg">${game.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex justify-between text-gray-900 font-semibold pb-4">
          <span className="text-xl">Order Total</span>
          <span className="text-xl">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className="flex justify-center w-full py-4 md:py-5 mb-6 bg-soft-gray text-white text-sm font-medium rounded-[8px] hover:bg-gray-800 mx-auto max-w-[370px] md:max-w-[initial]">
        Checkout
      </button>
    </>
  );
};