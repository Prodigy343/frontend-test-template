import { Game } from "@/types/games";
import Image from "next/image";
import { FC } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:3000";

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

const GameCard: FC<GameCardProps> = ({ game, onAddToCart }) => {
  return (
    <div className="w-[327px] lg:w-[380px] bg-white rounded-[16px] overflow-hidden border p-[24px]">
      <div className="border border-0 relative overflow-hidden w-full h-[240px] rounded-[16px] rounded-b-none">
        <Image
          src={BASE_URL + game.image}
          alt={game.name}
          fill
          className="object-cover"
        />
        {game.isNew && 
          <span className="absolute top-3 left-3 bg-white text-black px-3 py-2 rounded-[4px] text-base font-light font-archivo leading-[initial]">
            New
          </span>
        }
      </div>
      <div className="pt-[20px]">
        <p className="text-base text-gray-500 uppercase font-medium">{game.genre}</p>
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[250px]">
            {game.name}
          </h2>
          <p className="text-xl font-bold text-gray-800">${game.price}</p>
        </div>
        <button
          onClick={() => onAddToCart(game)}
          className="bg-white border border-light-black rounded-lg light-black w-full p-4 mt-[20px]"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default GameCard;