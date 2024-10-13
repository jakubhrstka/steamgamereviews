"use server";

import { removeFavoriteGame } from "@/data-access/favorite-game/remove-favorite-game.persistence";
import { auth } from "@/lib/auth";
import { removeFavoriteGameUseCase } from "@/use-cases/favorite-games/remove-favorite-game.use-case";
import { revalidatePath } from "next/cache";

export async function removeFavoriteGameAction(id: number) {
  await removeFavoriteGameUseCase(
    { removeFavoriteGame, getUserSession: auth },
    { id: id }
  );

  revalidatePath("/favorites");
}
