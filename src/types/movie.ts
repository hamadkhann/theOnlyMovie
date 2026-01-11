export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genres: Genre[];
    spoken_languages: Language[];
}

export interface Genre {
    id: number,
    name: string,
}

export interface Language {
    name: string,
}

export interface Video {
    id: string;
    key: string;          // YouTube video ID
    name: string;
    site: string;         // "YouTube"
    type: string;         // "Trailer", "Teaser", etc.
    official: boolean;
}