"use client";

import { removeFavoriteGameAction } from "../_actions/remove-favorite-game";
import { X } from "lucide-react";

export default function AddToFavoritesButton({ id }: { id: number }) {
  const handleRemove = async () => {
    await removeFavoriteGameAction(id);
  };

  return (
    <button
      onClick={handleRemove}
      className="text-slate-200 hover:text-slate-500"
    >
      <X />
    </button>
  );
}
