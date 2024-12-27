"use client";

import OrderList from "@/components/orderList";
import { OrderSummary } from "@/components/orderSummary";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Cart: React.FC = () => {
  const {cart, deleteGame} = useCartStore();
  const { push } = useRouter();

  return (<div className="max-w-[1280px] mx-auto min-h-[calc(100vh-175px-72px)] px-3">
    <div className="flex flex-col w-full">
      <div className="w-full flex text-sm pt-4 md:pt-6" onClick={() => push('/')}>
          <Image
            src="/images/arrow-left.svg"
            alt="cart logo"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Back to Catalog
      </div>
      <div className="pt-12 md:pt-20 w-full text-lg md:text-3xl font-bold">
        Your Cart
      </div>
      <div className="w-full text-md md:text-2xl pt-3 pb-8 md:pb-12">
        {cart.length} items
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-[6%]">
      <div className="w-full md:w-[53%]">
        <OrderList games={cart} handleRemove={deleteGame} />
      </div>
      <div className="w-full md:w-[41%]">
        <OrderSummary games={cart} />
      </div>
    </div>
  </div>);
}

export default Cart;