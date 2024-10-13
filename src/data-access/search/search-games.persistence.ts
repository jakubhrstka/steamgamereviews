import { SearchResultsDto } from "@/use-cases/search/search-games.use-case";
import { STEAM_API_BASE_URL } from "../utils";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { createRateLimiter, handleRateLimitError } from "@/lib/rate-limit";

type SteamSearchResponse = {
  total: number;
  items: {
    name: string;
    id: number;
  }[];
};

const toDtoMapper = (result: SteamSearchResponse): SearchResultsDto => {
  return {
    items: result.items.map((item) => ({
      name: item.name,
      id: item.id,
    })),
  };
};

const rateLimiter = createRateLimiter();

export async function searchGames(query: string): Promise<SearchResultsDto> {
  const ip = cookies().get("X-Forwarded-For")?.value || "unknown-ip";

  try {
    await rateLimiter.consume(ip);

    const cachedSearchResponse = await redis.get(`search:${query}`);

    if (cachedSearchResponse) {
      return toDtoMapper(JSON.parse(cachedSearchResponse));
    } else {
      const response = await fetch(
        `${STEAM_API_BASE_URL}/api/storesearch?l=english&cc=US&term=${query}`,
        { method: "GET" }
      );
      const result = await response.json();

      await redis.set(`search:${query}`, JSON.stringify(result), {
        EX: 86400,
      }); // expire

      return toDtoMapper(result);
    }
  } catch (error) {
    handleRateLimitError(error);

    throw new Error("Failed to search for games");
  }
}
