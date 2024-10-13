import Link from "next/link";
import { getReviewsAction } from "./_actions/get-reviews";
import AddToFavoritesButton from "./_components/add-to-favorites-button";
import { Metadata } from "next";
import { getFavoriteGamesAction } from "../favorites/_actions/get-favorite-games";

export const metadata: Metadata = {
  title: "Review Search | Game Detail",
  description: "Detail of a game with reviews.",
};

export default async function GameDetail({
  params: { appId },
}: {
  params: { appId: string };
}) {
  const reviews = await getReviewsAction(appId);
  const favorites = await getFavoriteGamesAction();

  const isAlreadyInFavorites = favorites.items.some(
    (favorite) => favorite.appId === appId
  );

  const isAnyReviewWithZeroPlaytime = reviews.items.some(
    (review) => review.playtimeForever === 0
  );

  const getFormattedPlayedTimeString = (time: number) => {
    return time === 1 ? `${time} hour` : `${time} hours`;
  };

  return (
    <main className="max-w-screen-md mx-auto min-h-[calc(100dvh-60px)] flex flex-col justify-center items-center px-4 py-10 gap-4">
      {reviews.items.map((review) => (
        <div key={review.id}>
          <p className="text-slate-200">
            {review.review}{" "}
            <span className="text-slate-500 whitespace-nowrap">
              {getFormattedPlayedTimeString(review.playtimeForever)} played*
            </span>
          </p>
        </div>
      ))}

      {isAnyReviewWithZeroPlaytime ? (
        <p className="text-slate-700 text-sm my-8">
          *Some games on Steam don&apos;t track playtime because the game is run
          through an external launcher.
        </p>
      ) : null}

      {!isAlreadyInFavorites ? (
        <AddToFavoritesButton appId={Number(appId)} />
      ) : null}

      <Link
        href="/"
        className="mt-4 font-bold text-slate-500 hover:text-slate-700"
      >
        BACK
      </Link>
    </main>
  );
}
