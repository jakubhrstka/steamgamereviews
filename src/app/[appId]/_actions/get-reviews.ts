"use server";

import { getReviews } from "@/data-access/review/get-reviews.persistence";
import { getReviewsUseCase } from "@/use-cases/reviews/get-reviews.use-case";

export async function getReviewsAction(appId: string) {
  const reviews = await getReviewsUseCase({ getReviews }, { appId });

  return reviews;
}
