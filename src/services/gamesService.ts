import { PATHS } from "@/static/url";
import { GamesResponse } from "@/types/games";
import { httpClient } from "./httpClient";
import { HttpClientError } from "@/types/common";

export const fetchGames = async (genre?: string, page?: number): Promise<GamesResponse> => {
  try {
    return await httpClient<GamesResponse>(PATHS.GAME_LIST, {
      queryParams: { genre, page },
    });
  } catch (error: unknown) {
    if ((error as HttpClientError).message) {
      throw new Error((error as HttpClientError).message);
    }

    throw new Error("An unexpected error occurred while fetching games.");
  }
};