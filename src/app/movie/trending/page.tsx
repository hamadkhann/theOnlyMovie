import { getTrendingMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";

export default async function Trending() {
  const trending = await getTrendingMovies();
  return (
    <div className="">
      <MovieGrid title="Now Trending 🔥" movies={trending} />
    </div>
  );
}
