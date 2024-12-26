"use client";

import OrderList from "@/components/orderList";
import { OrderSummary } from "@/components/orderSummary";
import { useCartStore } from "@/store/useCartStore";

const Cart: React.FC = () => {
  const {cart, deleteGame} = useCartStore();

  return (<>
    <div className="max-w-[1280px] mx-auto flex gap-[6%]">
      <div className="w-[53%]">
        <OrderList games={cart} handleRemove={deleteGame} />
      </div>
      <div className="w-[41%]">
        <OrderSummary games={cart} />
      </div>
    </div>
  </>);
}

export default Cart;