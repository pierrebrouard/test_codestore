// Define a type for a Movie
interface Movie {
title: string; // hyperlink to the next movies/:movie_id endpoint
release_date: Date;
vote_average: number;
poster_path: string;
};

interface PopularMovie {
    title: string;
    release_date: Date;
    vote_average: number;
};

export { Movie, PopularMovie };