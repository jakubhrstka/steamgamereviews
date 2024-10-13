import { db } from "@/lib/db";

export async function removeFavoriteGame(id: number) {
  try {
    await db.favoriteGame.delete({ where: { id } });
  } catch (error) {
    throw Error("Faled to remove favorite game");
  }
}
