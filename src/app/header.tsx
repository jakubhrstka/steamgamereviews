import { auth } from "@/lib/auth";
import SignInButton from "./sign-in-button";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <header className="px-4 py-4 flex gap-2 justify-between">
      <Link href="/" className="text-xl slate-300 font-bold">
        REVIEWS
      </Link>

      {session?.user ? session.user.name : <SignInButton />}
    </header>
  );
}
