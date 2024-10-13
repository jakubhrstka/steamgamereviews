import { db } from "@/lib/db";
import { getGameDetail } from "../game/get-game-detail.persistence";
import { AddFavoriteGameDto } from "@/use-cases/favorite-games/add-favorite-game.use-case";

export async function addFavoriteGame(game: AddFavoriteGameDto) {
  try {
    const detail = await getGameDetail(String(game.appId));

    await db.favoriteGame.create({
      data: {
        appId: String(game.appId),
        name: detail.name,
        user: { connect: { id: game.userId } },
      },
    });
  } catch (error) {
    throw new Error("Failed to add new favorite game");
  }
}
