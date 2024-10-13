"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-slate-200 hover:text-slate-500"
    >
      sign out
    </button>
  );
}
