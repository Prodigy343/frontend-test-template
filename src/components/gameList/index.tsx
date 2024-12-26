import { FC } from "react";
import GameCard from "../gameCard";
import { Game } from "@/types/games";

interface GameListProps {
  games: Game[];
  onAddToCart: (game: Game) => void;
}

const GameList: FC<GameListProps> = ({ games, onAddToCart}) => {
  return (
    <div>
      <div className="grid place-items-center sm:place-items-start grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[48px] pb-12">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default GameList;