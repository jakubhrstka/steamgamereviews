"use server";

import { addFavoriteGame } from "@/data-access/favorite-game/add-favorite-game.persistence";
import { auth } from "@/lib/auth";
import { addFavoriteGameUseCase } from "@/use-cases/favorite-games/add-favorite-game.use-case";
import { revalidatePath } from "next/cache";

export async function addFavoriteGameAction(appId: number) {
  await addFavoriteGameUseCase(
    { addFavoriteGame, getUserSession: auth },
    { appId: appId }
  );

  revalidatePath("/favorites");
}
