export type ReviewsDto = {
  items: {
    id: string;
    review: string;
    playtimeForever: number;
  }[];
};

export async function getReviewsUseCase(
  context: { getReviews: (appId: string) => Promise<ReviewsDto> },
  data: {
    appId: string | null;
  }
): Promise<ReviewsDto> {
  if (!data.appId) return { items: [] };

  const reviews: ReviewsDto = await context.getReviews(data.appId);

  const topReviews = reviews.items.splice(0, 3);

  reviews.items.forEach((review) => {
    const playtime = review.playtimeForever;

    let minIndex = 0;
    for (let i = 1; i < topReviews.length; i++) {
      if (
        topReviews[i].playtimeForever < topReviews[minIndex].playtimeForever
      ) {
        minIndex = i;
      }
    }
    if (playtime > topReviews[minIndex].playtimeForever) {
      topReviews[minIndex] = review;
    }

    topReviews.sort((a, b) => b.playtimeForever - a.playtimeForever);
  });

  return { items: topReviews };
}
