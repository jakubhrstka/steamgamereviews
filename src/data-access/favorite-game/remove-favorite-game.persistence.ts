import { db } from "@/lib/db";

export async function removeFavoriteGame(id: number) {
  try {
    await db.favoriteGame.delete({ where: { id } });
  } catch {
    throw Error("Faled to remove favorite game");
  }
}
