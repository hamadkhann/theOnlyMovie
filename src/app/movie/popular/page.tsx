import { getPopularMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export default async function Popular() {
  const popular = await getPopularMovies();
  return (
    <div className="">
      <MovieGrid title="Popular Movies ⭐" movies={popular} />
    </div>
  );
}
