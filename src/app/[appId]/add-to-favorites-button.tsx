"use client";

import { addFavoriteGameAction } from "./_actions/add-favorite-game";

export default function AddToFavoritesButton({ appId }: { appId: number }) {
  const handleAdd = async () => {
    await addFavoriteGameAction(appId);
  };

  return (
    <button onClick={handleAdd} className="text-slate-200 hover:text-slate-500">
      add to favorites
    </button>
  );
}
