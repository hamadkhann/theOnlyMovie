import { getTopRatedMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export default async function TopRated() {
  const topRated = await getTopRatedMovies();
  return (
    <div className="">
      <MovieGrid title="Top Rated Movies 🏆" movies={topRated} />
    </div>
  );
}
