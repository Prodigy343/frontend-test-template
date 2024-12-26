import { create } from "zustand";
import { fetchGames } from "@/services/gamesService";
import { Game } from "@/types/games";
import { AppError } from "@/types/common";
import { handleError } from "@/utils/handleError";

interface GameStoreState {
  games: Game[];
  availableFilters: string[];
  currentGenre: string | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: AppError | null;
  loadGames: (genre?: string, page?: number, append?: boolean) => Promise<void>;
  setCurrentGenre: (genre: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  games: [],
  availableFilters: [],
  currentGenre: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,

  loadGames: async (genre, page = 1, append = false) => {
    set({ loading: true, error: null });

    try {
      const currentGenre = genre || (get().currentGenre ?? undefined);
      const response = await fetchGames(currentGenre, page);

      set((state) => ({
        games: append ? [...state.games, ...response.games] : response.games,
        availableFilters: response.availableFilters,
        currentGenre: currentGenre || state.currentGenre,
        currentPage: page,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      const appError = handleError(err);
      set({ error: appError });
    } finally {
      set({ loading: false });
    }
  },

  setCurrentGenre: (genre: string) => {
    set({ currentGenre: genre, currentPage: 1 });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
}));