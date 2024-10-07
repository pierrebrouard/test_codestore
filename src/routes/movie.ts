// src/routes/movies.ts
import { Router, Request, Response } from 'express';
import movie_API, { getData } from '../external/movie';

const router = Router();

// Define a type for a Movie
type Movie = {
  id: number;
  title: string; // hyperlink to the next movies/:movie_id endpoint
  hyperlink: string;
  release_date: Date;
  vote_average: number;
  poster_path: string;
};

type PopularMovie = {
    title: string;
    release_date: Date;
    vote_average: number;
}

// GET /movies
// Get popular movies info in 1 PDF
router.get('/', async (req: Request, res: Response) => {
    const resp = await movie_API.getData('3/movie/popular'); // async await 
    const results: any[] = resp["results"]
    const movies: PopularMovie[] = results.map(movie => 
        ({
            title: movie['title'],
            hyperlink: `https://api.themoviedb.org/3/movie/${movie['id'] + 1}`,
            release_date: movie['release_date'],
            vote_average: movie['vote_average'],
        })
    );
    console.log(movies)
    // Generate PDF from PopularMovie array
    res.json(movies);
});

// GET /movies/:id
// GET specific movie PDF
router.get('/:id', async (req: Request, res: Response) => {
  const movieId= parseInt(req.params.id, 10);
    //  const movie: Movie = {}; // req spec movie from Movie DB
  const movie = {}; // req spec movie from Movie DB

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// Export the router
export default router;
