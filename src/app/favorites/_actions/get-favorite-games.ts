"use server";

import { getFavoriteGames } from "@/data-access/favorite-game/get-favorite-games.persistence";
import { auth } from "@/lib/auth";
import { getFavoriteGamesUseCase } from "@/use-cases/favorite-games/get-favorite-games.use-case";

export async function getFavoriteGamesAction() {
  const games = await getFavoriteGamesUseCase({
    getFavoriteGames,
    getUserSession: auth,
  });

  return games;
}
