// src/components/MovieGrid.jsx
import type { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movies: Movie[];
  title: string;
}

export default function MovieGrid({ movies, title }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div
              key={movie.id}
              className="rounded-lg overflow-hidden shadow-md bg-gray-800 hover:scale-105 transition-transform duration-200"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold">{movie.title}</h3>
                <p className="text-xs text-gray-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
