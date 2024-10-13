export type FavoriteGamesDto = {
  items: {
    id: number;
    appId: string;
    name: string;
  }[];
};

export async function getFavoriteGamesUseCase(context: {
  getFavoriteGames: () => Promise<FavoriteGamesDto>;
}): Promise<FavoriteGamesDto> {
  const favoriteGames: FavoriteGamesDto = await context.getFavoriteGames();

  return favoriteGames;
}
