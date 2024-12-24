import { CartState } from "@/types/cart";
import { Game } from "@/types/games";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addGame: (game: Game) => {
        set((state) => {
          const isAlreadyInCart = state.cart.some((item) => item.name === game.name);
          return isAlreadyInCart ? state : { cart: [...state.cart, game] };
        });
      },

      deleteGame: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((game) => game.id !== id),
        }));
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);