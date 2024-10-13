import { auth } from "@/lib/auth";
import SignInButton from "./sign-in-button";
import Link from "next/link";
import SignOutButton from "./sign-out-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="px-4 py-4 flex gap-2 justify-between">
      <Link
        href="/"
        className="text-xl text-slate-200 hover:text-slate-500 font-bold"
      >
        REVIEWS
      </Link>

      {session?.user ? (
        <div className="flex gap-4 items-center">
          <Link
            href="/favorites"
            className="text-slate-200 hover:text-slate-500"
          >
            favorites
          </Link>
          {session.user.name} <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </header>
  );
}
