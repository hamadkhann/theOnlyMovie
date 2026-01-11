import type { Movie } from "@/types/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//trending
export async function getTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } } // cache for 1 hour
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await res.json();
  return data.results || [];
}

// Popular
export async function getPopularMovies(): Promise<Movie[]> {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file"
    );
  }

  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } } // cache for 1 hour
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch popular movies: ${res.status} ${res.statusText}. ${errorText}`
    );
  }

  const data = await res.json();
  return data.results || [];
}

// Top Rated
export async function getTopRatedMovies(): Promise<Movie[]> {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file"
    );
  }

  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } } // cache for 1 hour
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch top rated movies: ${res.status} ${res.statusText}. ${errorText}`
    );
  }

  const data = await res.json();
  return data.results || [];
}


// movie ID
export async function getMovieById(id: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    if (!res.ok) {
      console.error("Failed to fetch movie:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}


//movie trailer api

export async function getMovieVideos(movieId: string) {
    const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    
    if (!res.ok) {
        throw new Error("Failed to fetch movie videos");
    }
    
    const data = await res.json();
    return data.results;
}

// Search input field api 

// Search movies by query
export async function searchMovies(query: string) {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    
    if (!res.ok) {
        throw new Error("Failed to search movies");
    }
    
    const data = await res.json();
    return data.results; // Array of movies return karega
}