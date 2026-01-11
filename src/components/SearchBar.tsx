"use client";

import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [result, setResult] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // api used here
  async function performSearch() {
    setLoading(true);
    try {
      const movies = await searchMovies(searchQuery);
      setResult(movies);
    } catch (error) {
      console.error("Search failed:", error);
      setResult([]);
    } finally {
      setLoading(false);
    }
  }

  //Debouncing logic
  useEffect(() => {
    // 500 ms ke bad ye code run hoga
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        performSearch();
      }
      // 500 is ms means 0.5 sec
    }, 500);
    // / Step 3: Cleanup function
    // Agar user dobara type kare toh purana timer cancel karo
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-60 sm:w-60 lg:w-72 xl:w-90  h-8">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-60 h-8 lg:h-9 sm:w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-red-500 transition-colors md:px-4 md:py-3 text-sm md:text-base"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setResult([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchQuery.length > 2 && (
        <div className="absolute top-full mt-2 w-full  bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
          {loading && (
            <div className="p-4 text-center text-gray-400">
              <p>Searching...</p>
            </div>
          )}

          {!loading && result.length === 0 && (
            <div className="p-4 text-center text-gray-400">
              <p>No movies found</p>
            </div>
          )}

          {!loading && result.length > 0 && (
            <>
              <div className="p-3 border-b border-gray-700 text-sm text-gray-400">
                Found {result.length} results
              </div>
              {result.map((movie: Movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0"
                  onClick={() => {
                    setSearchQuery("");
                    setResult([]);
                  }}
                >
                  {/* Poster */}
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      width={50}
                      height={75}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-[50px] h-[75px] bg-gray-800 rounded flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                      {movie.vote_average > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-500">
                            ⭐ {movie.vote_average.toFixed(1)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
