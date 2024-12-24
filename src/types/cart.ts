import { Game } from "./games";

export interface CartState {
  cart: Game[];
  addGame: (game: Game) => void;
  deleteGame: (id: string) => void;
}