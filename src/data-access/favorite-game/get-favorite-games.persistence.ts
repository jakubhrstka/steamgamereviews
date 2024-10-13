import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FavoriteGamesDto } from "@/use-cases/favorite-games/get-favorite-games.use-case";
import { AuthenticationError } from "@/use-cases/utils";
import { FavoriteGame } from "@prisma/client";

const toDtoMapper = (games: FavoriteGame[]): FavoriteGamesDto => ({
  items: games.map((game) => ({
    id: game.id,
    appId: game.appId,
    name: game.name,
  })),
});

export async function getFavoriteGames() {
  const session = await auth();

  try {
    if (!session?.user) throw new AuthenticationError();

    const games = await db.favoriteGame.findMany({
      where: { userId: session.user.id },
    });

    return toDtoMapper(games);
  } catch {
    throw new Error("Failed to get favorite games");
  }
}
