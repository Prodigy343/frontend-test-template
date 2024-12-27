import { create } from "zustand";
import { fetchGames } from "@/services/gamesService";
import { Game, GamesResponse } from "@/types/games";
import { AppError } from "@/types/common";
import { handleError } from "@/utils/handleError";
import { allFilter } from "@/static/filters";

interface GameStoreState {
  games: Game[];
  availableFilters: string[];
  currentGenre: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: AppError | null;
  initialLoad: (genre?: string, page?: number) => Promise<void>;
  loadGames: (genre?: string, page?: number, append?: boolean) => Promise<void>;
  setCurrentGenre: (genre: string) => void;
  setCurrentPage: (page: number) => void;
  setFilters: (genre: string, page: number) => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  games: [],
  availableFilters: [allFilter],
  currentGenre: allFilter,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,

  initialLoad: async (genre = '', page = 1) => {
    set({ loading: true, error: null });

    try {
      let allGames: Game[] = [];
      let response: GamesResponse;
      let currentGenre: string = genre;
      let i;

      if(currentGenre === allFilter) currentGenre = '';

      for(i=1 ; i<=page ; i++){
        response = await fetchGames(currentGenre, i);
        if(i > response.totalPages)break;
        allGames = [...allGames, ...response.games];
      }

      set((state) => ({
        games: allGames,
        availableFilters: [allFilter, ...response.availableFilters],
        currentGenre: currentGenre === '' ? allFilter : currentGenre,
        currentPage: i > response.totalPages ? response.totalPages : page,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      const appError = handleError(err);
      set({ error: appError });
    } finally {
      set({ loading: false });
    }
  },

  loadGames: async (genre, page = 1, append = false) => {
    set({ loading: true, error: null });

    try {
      let currentGenre = genre || (get().currentGenre ?? undefined);
      if(currentGenre === allFilter) currentGenre = '';
      const response = await fetchGames(currentGenre, page);

      set((state) => ({
        games: append ? [...state.games, ...response.games] : response.games,
        availableFilters: [allFilter, ...response.availableFilters],
        currentGenre: currentGenre === '' ? allFilter : currentGenre,
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

  setFilters(genre, page) {
    set({ currentGenre: genre, currentPage: page });
  },
}));