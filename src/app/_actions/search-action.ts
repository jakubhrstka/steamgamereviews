"use server";

import { searchGames } from "@/data-access/search/search-games.persistence";
import { searchGamesUseCase } from "@/use-cases/search/search-games.use-case";

export async function searchAction(query: string) {
  const searchResult = await searchGamesUseCase({ searchGames }, { query });

  return searchResult;
}
