import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { user_id, tmdb_id, rating } = await req.json();

  // 1️⃣ Try finding movie by tmdb_id
  let { data: movie, error } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", tmdb_id)
    .single();

  // 2️⃣ If movie does NOT exist → create it
  if (!movie) {
    const { data: newMovie, error: insertError } = await supabase
      .from("movies")
      .insert({
        tmdb_id,
        title: "Unknown Title", // later TMDB se fill kar sakte ho
        genres: [],
        moods: [],
        runtime: null,
      })
      .select("id")
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    movie = newMovie;
  }

  // 3️⃣ Insert rating using UUID
  const { error: ratingError } = await supabase.from("user_movies").insert({
    user_id,
    movie_id: movie.id,
    rating,
  });

  if (ratingError) {
    return NextResponse.json({ error: ratingError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
