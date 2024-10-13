import {
  FavoriteGameEntity,
  FavoriteGameEntityValidationError,
} from "@/app/entities/favorite-game";
import { Session } from "next-auth";
import { AuthenticationError, ValidationError } from "../utils";

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

export async function addFavoriteGameUseCase(
  context: {
    getUserSession: () => Promise<Session | null>;
    addFavoriteGame: (game: AddFavoriteGameDto) => void;
  },
  data: { appId: number }
): Promise<void> {
  const session = await context.getUserSession();

  if (!session || !session?.user?.id) {
    throw new AuthenticationError();
  }

  try {
    const newFavoriteGame = new FavoriteGameEntity({
      appId: data.appId,
      userId: session.user.id,
    });

    await context.addFavoriteGame(
      favoriteGameToAddFavoriteGameDtoMapper(newFavoriteGame)
    );
  } catch (error) {
    if (error instanceof FavoriteGameEntityValidationError)
      throw new ValidationError(error.getErrors());

    throw error;
  }
}
