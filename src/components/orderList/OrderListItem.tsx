import Image from "next/image";
import { FC } from "react";

interface OrderListItemProps {
  image: string;
  genre: string;
  name: string;
  description?: string;
  price: number;
  last?: boolean;
  onRemove: () => void;
}

const OrderListItem: FC<OrderListItemProps> = ({ image, genre, name, description, price, last = false, onRemove }) => {
  return (
    <div className={"flex flex-col md:flex-row items-start gap-4 px-4 py-5 h-[331px] md:h-[196px] " + (!last ? "border-b border-gray-200" : "")}>
      <div className="flex flex-row h-[156px] w-full md:w-[37%]">
        <div className="flex-[0.85] md:flex-1 border border-0 relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-[0.15] flex items-baseline justify-center md:hidden">
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Remove item mobile"
          >
            &times;
          </button>
        </div>
      </div>

      <div className="flex-1 h-full flex flex-col">
        <p className="text-base text-gray-500 uppercase">{genre}</p>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {description && (
          <p className="text-base text-gray-500">{description}</p>
        )}
        <p className="mt-auto text-lg font-semibold text-gray-900 text-right">${price}</p>
      </div>

      <div className="flex hidden md:flex flex-col items-end h-full">
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 text-2xl"
          aria-label="Remove item"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default OrderListItem;