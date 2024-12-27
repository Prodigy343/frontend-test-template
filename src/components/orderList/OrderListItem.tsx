import Image from "next/image";
import { FC } from "react";

interface OrderListItemProps {
  image: string;
  genre: string;
  name: string;
  description?: string;
  price: number;
  onRemove: () => void;
}

const OrderListItem: FC<OrderListItemProps> = ({ image, genre, name, description, price, onRemove }) => {
  return (
    <div className="flex items-start gap-4 border-b border-gray-200 px-4 py-5 h-[196px]">
      <div className="border border-0 relative overflow-hidden h-[156px] w-[37%]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 h-full flex flex-col">
        <p className="text-xs text-gray-500 uppercase">{genre}</p>
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        <p className="mt-auto text-sm font-semibold text-gray-900 text-right">${price}</p>
      </div>

      <div className="flex flex-col items-end h-full">
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