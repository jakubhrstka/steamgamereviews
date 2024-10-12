"use server";

import { searchGames } from "@/data-access/search.persistence";
import { searchGamesUseCase } from "@/use-cases/search/search-games.use-case";

export async function searchAction(query: string) {
  try {
    const searchResult = await searchGamesUseCase({ searchGames }, { query });

    return searchResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server action search error");
    }
  }
}
