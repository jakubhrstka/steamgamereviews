import { STEAM_API_BASE_URL } from "../utils";
import { redis } from "@/lib/redis";
import { createRateLimiter, handleRateLimitError } from "@/lib/rate-limit";
import { cookies } from "next/headers";

type SteamGameDetail = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: {
    minimum: string;
    recommended: string;
  };
  mac_requirements: {
    minimum: string;
    recommended: string;
  };
  linux_requirements: {
    minimum: string;
    recommended: string;
  };
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  packages: number[];
  package_groups: Array<{
    name: string;
    title: string;
    description: string;
    selection_text: string;
    save_text: string;
    display_type: number;
    is_recurring_subscription: string;
    subs: Array<{
      packageid: number;
      percent_savings_text: string;
      percent_savings: number;
      option_text: string;
      option_description: string;
      can_get_free_license: string;
      is_free_license: boolean;
      price_in_cents_with_discount: number;
    }>;
  }>;
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  metacritic: {
    score: number;
    url: string;
  };
  categories: Array<{
    id: number;
    description: string;
  }>;
  genres: Array<{
    id: string;
    description: string;
  }>;
  screenshots: Array<{
    id: number;
    path_thumbnail: string;
    path_full: string;
  }>;
  movies: Array<{
    id: number;
    name: string;
    thumbnail: string;
    webm: {
      480: string;
      max: string;
    };
    mp4: {
      480: string;
      max: string;
    };
    highlight: boolean;
  }>;
  recommendations: {
    total: number;
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: {
    ids: number[];
    notes: string | null;
  };
  ratings: {
    esrb: {
      rating: string;
      interactive_elements: string;
    };
    pegi: {
      rating: string;
    };
    dejus: {
      rating: string;
    };
    steam_germany: {
      rating_generated: string;
      rating: string;
      required_age: string;
      banned: string;
      use_age_gate: string;
      descriptors: string;
    };
  };
};

type SteamGameDetailResponse = Record<
  string,
  {
    success: boolean;
    data: SteamGameDetail;
  }
>;

type GameDetailDto = {
  id: number;
  name: string;
};

const toDtoMapper = (gameDetail: SteamGameDetail): GameDetailDto => {
  return {
    id: gameDetail.steam_appid,
    name: gameDetail.name,
  };
};

const rateLimiter = createRateLimiter();

export async function getGameDetail(appId: string): Promise<GameDetailDto> {
  const ip = cookies().get("X-Forwarded-For")?.value || "unknown-ip";

  try {
    await rateLimiter.consume(ip);

    const cachedDetails = await redis.get(`detail:${appId}`);

    if (cachedDetails) {
      return toDtoMapper(JSON.parse(cachedDetails));
    } else {
      const response = await fetch(
        `${STEAM_API_BASE_URL}/api/appdetails?appids=${appId}`,
        { method: "GET" }
      );
      const result: SteamGameDetailResponse = await response.json();

      await redis.set(`detail:${appId}`, JSON.stringify(result[appId].data), {
        EX: 604800,
      }); // expire after 7 day

      return toDtoMapper(result[appId].data);
    }
  } catch (error) {
    handleRateLimitError(error);

    throw new Error("Failed to fetch reviews");
  }
}
