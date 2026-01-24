"use client";

// src/components/MovieGrid.jsx
import type { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movies: Movie[];
  title: string;
}

export default function MovieGrid({ movies, title }: Props) {
  const USER_ID = "550e8400-e29b-41d4-a716-446655440000";

  const rateMovie = async (tmdb_id: number, rating: number) => {
    await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "629e0276-2995-4d64-9be7-9120a699eff9",
        tmdb_id,
        rating,
      }),
    });
    alert(`Rated ${rating} ⭐ for movie!`);
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="rounded-lg overflow-hidden shadow-md bg-gray-800 hover:scale-105 transition-transform duration-200"
          >
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
            </Link>
            <div className="p-2">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
              <p className="text-xs text-gray-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
              {/* Quick Rating Buttons */}
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent Link click
                      rateMovie(movie.id.toString(), star);
                    }}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
