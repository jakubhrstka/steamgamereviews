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
    appId: string;
  }
): Promise<ReviewsDto> {
  if (!data.appId) return { items: [] };

  const reviews = await context.getReviews(data.appId);

  // remove the first 3 reviews from the list
  const topReviews = reviews.items.splice(0, 3);

  // iterate through the reviews and find the top 3 reviews and sort them by playtime
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
