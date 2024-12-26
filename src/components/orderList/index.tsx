import GameListItem from "@/components/orderList/OrderListItem";
import { Game } from "@/types/games";
import { FC } from "react";

interface OrderListProps {
  games: Game[];
  handleRemove: (id: string) => void;
}

const OrderList: FC<OrderListProps> = ({ games, handleRemove }) => {
  return (
    <div className="max-w-xl mx-auto">
      {games.map((game, index) => (
        <GameListItem
          key={index}
          image={game.image}
          genre={game.genre}
          name={game.name}
          description={game.description}
          price={game.price}
          onRemove={() => handleRemove(game.id)}
        />
      ))}
    </div>
  );
};

export default OrderList;