import { Divider } from "@/components/ui/Divider";
import { getMovieById, getMovieVideos } from "@/lib/tmdb";
import { Genre, Language, Video } from "@/types/movie";
import Image from "next/image";

export default async function MovieDetailPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    console.log("MovieDetailPage params:", params);

    const movie = await getMovieById(params.id);
    const videos = await getMovieVideos(params.id);
    try {
        console.log("MovieDetailPage fetched movie:", movie ? "Found" : "Not Found");
        console.log("data", movie)
    } catch (err: any) {
        console.error("MovieDetailPage error:", err);
        return (
            <div className="p-6 text-red-500">
                <h2 className="font-bold">Error Loading Movie</h2>
                <p>ID: {params.id}</p>
                <p>Error: {err.message}</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="p-6">
                <p>Movie not found.</p>
                <p className="text-sm text-gray-500">ID: {params.id}</p>
            </div>
        );
    }

    const trailer = videos.find(
        (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return (
        <div className="min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl border-2 border-gray-700/50 shadow-2xl p-8 md:p-10">
                {/* Title Section */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    {movie.title}
                </h1>

                {/* Poster & Trailer Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-10">
                    {/* Poster */}
                    <div className="flex-shrink-0 w-full lg:w-1/3">
                        <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={500}
                                height={750}
                                className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    {/* Trailer */}
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-red-500">🎬</span>
                            Official Trailer
                        </h2>
                        {trailer ? (
                            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-red-500/30 hover:border-red-500 transition-colors duration-300">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video rounded-xl bg-gray-800/50 flex items-center justify-center border-2 border-dashed border-gray-600">
                                <p className="text-gray-400 text-lg">No trailer available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Movie Info Section */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                    {/* Genres */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-300">Genres</h3>
                        <ul className="flex flex-wrap gap-3">
                            {movie.genres.map((genre: Genre) => (
                                <li
                                    key={genre.id}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-full text-sm font-medium hover:from-red-500/30 hover:to-orange-500/30 hover:border-red-400 transition-all duration-300 cursor-default"
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Divider />

                    {/* Overview */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-300">Overview</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                    </div>

                    <Divider />

                    {/* Rating */}
                    <div className="mb-6 flex items-center gap-4">
                        <h3 className="text-xl font-semibold text-gray-300">Rating:</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-yellow-400">
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="text-gray-400 text-lg">/ 10</span>
                            <span className="text-2xl">⭐</span>
                        </div>
                    </div>

                    <Divider />

                    {/* Release Date */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-300 inline-block mr-3">Release Date:</h3>
                        <span className="text-lg text-gray-400">{movie.release_date}</span>
                    </div>

                    <Divider />

                    {/* Languages */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-300">Spoken Languages</h3>
                        <ul className="flex flex-wrap gap-3">
                            {movie.spoken_languages.map((language: Language, index: number) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 bg-gray-700/50 rounded-lg text-sm border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                                >
                                    {language.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}