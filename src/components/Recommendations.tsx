"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "@/lib/getRecommendations";

export default function Recommendations() {
  const [movies, setMovies] = useState<any[]>([]);
  const [mood, setMood] = useState("");

  useEffect(() => {
    getRecommendations(mood).then(setMovies);
  }, [mood]);

  return (
    <div className="p-6">
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="bg-zinc-800 p-2 rounded"
      >
        <option value="">All</option>
        <option value="mind-bending">Mind Bending</option>
        <option value="dark">Dark</option>
      </select>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {movies.map((item) => (
          <div key={item.movie.id} className="bg-zinc-900 p-4 rounded">
            <h3>{item.movie.title}</h3>
            <p className="text-xs text-zinc-400">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
