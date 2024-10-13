import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getFavoriteGamesAction } from "./_actions/get-favorite-games";
import Link from "next/link";
import RemoveFavoriteButton from "./remove-favorite-button";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const favoriteGames = await getFavoriteGamesAction();

  return (
    <main className="max-w-screen-md mx-auto min-h-[calc(100dvh-60px)] flex flex-col justify-center items-center px-4 py-10 gap-4">
      <h1 className="text-3xl font-semibold">Favorites</h1>
      {favoriteGames.items.map((game) => (
        <div key={game.id} className="flex items-center gap-2">
          <Link
            href={`/${game.appId}`}
            className="text-slate-200 hover:text-slate-500"
          >
            {game.name}
          </Link>

          <RemoveFavoriteButton id={game.id} />
        </div>
      ))}

      <Link
        href="/"
        className="mt-4 font-bold text-slate-500 hover:text-slate-700"
      >
        BACK
      </Link>
    </main>
  );
}
