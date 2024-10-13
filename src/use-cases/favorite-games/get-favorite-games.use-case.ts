import { Session } from "next-auth";
import { AuthenticationError } from "../utils";

export type FavoriteGamesDto = {
  items: {
    id: number;
    appId: string;
    name: string;
  }[];
};

export async function getFavoriteGamesUseCase(context: {
  getFavoriteGames: (userId: string) => Promise<FavoriteGamesDto>;
  getUserSession: () => Promise<Session | null>;
}): Promise<FavoriteGamesDto> {
  const session = await context.getUserSession();

  if (!session?.user?.id) throw new AuthenticationError();

  const favoriteGames = await context.getFavoriteGames(session.user.id);

  return favoriteGames;
}
