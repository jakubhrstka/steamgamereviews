export type SearchResultsDto = {
  items: {
    name: string;
    id: number;
  }[];
};

export async function searchGamesUseCase(
  context: { searchGames: (query: string) => Promise<SearchResultsDto> },
  data: {
    query: string | null;
  }
): Promise<SearchResultsDto> {
  if (!data.query) return { items: [] };

  const searchResults: SearchResultsDto = await context.searchGames(data.query);

  return searchResults;
}
