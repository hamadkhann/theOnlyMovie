import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  // 1️⃣ User watched movies
  const { data: watched } = await supabase
    .from("user_movies")
    .select("rating, movies ( id, title, genres, moods )")
    .eq("user_id", user_id);

  if (!watched || watched.length === 0) {
    return NextResponse.json({ message: "No history yet" });
  }

  // 2️⃣ Build preference sets
  const likedGenres = new Set<string>();
  const likedMoods = new Set<string>();

  watched.forEach((w: any) => {
    if (w.rating >= 4) {
      w.movies.genres.forEach((g: string) => likedGenres.add(g));
      w.movies.moods.forEach((m: string) => likedMoods.add(m));
    }
  });

  // 3️⃣ Fetch all movies
  const { data: movies } = await supabase.from("movies").select("*");

  // 4️⃣ Score movies
  const recommendations = movies
    ?.filter((m) => !watched.some((w) => w.movies.id === m.id))
    .map((movie) => {
      let score = 0;

      movie.genres.forEach((g: string) => {
        if (likedGenres.has(g)) score += 3;
      });

      movie.moods.forEach((m: string) => {
        if (likedMoods.has(m)) score += 2;
      });

      return {
        movie,
        score,
        reason: `Because you like ${[...likedGenres][0]}`,
      };
    })
    .sort((a, b) => b.score - a.score);

  return NextResponse.json(recommendations.slice(0, 10));
}
