import { SearchCommandBox } from "./search-command-box";

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto min-h-[calc(100dvh-60px)] flex flex-col items-center px-4 pt-32 pb-8">
      <h1 className="text-3xl font-semibold mb-4">Steam Game Review Search</h1>

      <p className="text-slate-400 mb-4">
        Search for reviews of your favorite Steam games from real users that
        have some significant playtime.
      </p>

      <SearchCommandBox />
    </main>
  );
}
