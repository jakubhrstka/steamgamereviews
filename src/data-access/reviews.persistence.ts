import { ReviewsDto } from "@/use-cases/reviews/get-reviews.use-case";
import { STEAM_API_BASE_URL } from "./utils";
import { redis } from "@/lib/redis";
import { createRateLimiter, handleRateLimitError } from "@/lib/rate-limit";
import { cookies } from "next/headers";

type SteamReviewResponse = {
  success: number;
  query_summary: {
    num_reviews: number;
    review_score: number;
    review_score_desc:
      | "Very Positive"
      | "Mixed"
      | "Mostly Positive"
      | "Positive"
      | "Very Negative"
      | "Negative"
      | "Overwhelmingly Positive"
      | "Overwhelmingly Negative"
      | "Mostly Negative"
      | "Mixed";
    total_positive: number;
    total_negative: number;
    total_reviews: number;
  };
  reviews: {
    recommendationid: string;
    author: {
      steamid: string;
      num_games_owned: number;
      num_reviews: number;
      playtime_forever: number;
      playtime_last_two_weeks: number;
      playtime_at_review?: number;
      last_played: number;
    };
    language: string;
    review: string;
    timestamp_created: number;
    timestamp_updated: number;
    voted_up: boolean;
    votes_up: number;
    votes_funny: number;
    weighted_vote_score: string;
    comment_count: number;
    steam_purchase: boolean;
    received_for_free: boolean;
    written_during_early_access: boolean;
    hidden_in_steam_china: boolean;
    steam_china_location: string;
    primarily_steam_deck: boolean;
  }[];
  cursor: string;
};

const toDtoMapper = (result: SteamReviewResponse): ReviewsDto => {
  return {
    items: result.reviews.map((item) => ({
      id: item.recommendationid,
      review: item.review,
      playtimeForever: item.author.playtime_forever,
    })),
  };
};

const rateLimiter = createRateLimiter();

export async function getReviews(appId: string): Promise<ReviewsDto> {
  const ip = cookies().get("X-Forwarded-For")?.value || "unknown-ip";

  try {
    await rateLimiter.consume(ip);

    const cachedReviews = await redis.get(`reviews:${appId}`);

    if (cachedReviews) {
      return toDtoMapper(JSON.parse(cachedReviews));
    } else {
      const response = await fetch(
        `${STEAM_API_BASE_URL}/appreviews/${appId}?json=1&filter=recent&language=english&day_range=365&num_per_page=100`,
        { method: "GET" }
      );
      const result = await response.json();

      await redis.set(`reviews:${appId}`, JSON.stringify(result), {
        EX: 86400,
      }); // expire after 1 day

      return toDtoMapper(result);
    }
  } catch (error) {
    handleRateLimitError(error);

    throw new Error("Failed to fetch reviews");
  }
}
