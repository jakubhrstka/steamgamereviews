"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="text-slate-200 hover:text-slate-500"
    >
      sign in
    </button>
  );
}
