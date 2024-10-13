import { FavoriteGameEntity } from "@/entities/favorite-game";
import { Session } from "next-auth";
import { AuthenticationError } from "../utils";

export type AddFavoriteGameDto = {
  appId: number;
  userId: string;
};

export function favoriteGameToAddFavoriteGameDtoMapper(
  game: FavoriteGameEntity
): AddFavoriteGameDto {
  return {
    appId: game.getAppId(),
    userId: game.getUserId(),
  };
}

export async function removeFavoriteGameUseCase(
  context: {
    getUserSession: () => Promise<Session | null>;
    removeFavoriteGame: (id: number) => void;
  },
  data: { id: number }
): Promise<void> {
  const session = await context.getUserSession();

  if (!session || !session?.user?.id) {
    throw new AuthenticationError();
  }

  await context.removeFavoriteGame(data.id);
}
