import { Dispatch, SetStateAction } from "react";
import { AppError } from "./common";

export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export interface UseGamesReturn {
  games: Game[];
  availableFilters: string[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: AppError | null;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  loadGames: (append?: boolean, page?: number) => Promise<void>
}