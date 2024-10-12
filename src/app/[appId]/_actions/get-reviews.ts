"use server";

import { getReviews } from "@/data-access/reviews.persistence";
import { getReviewsUseCase } from "@/use-cases/reviews/get-reviews.use-case";

export async function getReviewsAction(appId: string) {
  try {
    const reviews = await getReviewsUseCase({ getReviews }, { appId });

    return reviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server action reviews error");
    }
  }
}
