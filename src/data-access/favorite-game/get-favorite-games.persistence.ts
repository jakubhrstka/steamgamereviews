import { db } from "@/lib/db";
import { FavoriteGamesDto } from "@/use-cases/favorite-games/get-favorite-games.use-case";
import { FavoriteGame } from "@prisma/client";

const toDtoMapper = (games: FavoriteGame[]): FavoriteGamesDto => ({
  items: games.map((game) => ({
    id: game.id,
    appId: game.appId,
    name: game.name,
  })),
});

export async function getFavoriteGames(userId: string) {
  try {
    const games = await db.favoriteGame.findMany({
      where: { userId: userId },
    });

    return toDtoMapper(games);
  } catch {
    throw new Error("Failed to get favorite games");
  }
}
