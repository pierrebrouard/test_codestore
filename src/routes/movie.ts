// src/routes/movies.ts
import { Router, Request, Response } from 'express';
import { Movie, PopularMovie } from '../types/movies';
import movie_API, { getData } from '../external/movie';
import { generatePDF } from '../pdf';

const router = Router();

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
    // console.log(movies)
    // Generate PDF from PopularMovie array
    const headers = Object.keys(movies[0]);
    const tableArrays = movies.map(obj => Object.values(obj).map(value => String(value)));
    const completeTable = [headers, ...tableArrays];
    generatePDF(completeTable, 'popularmovies.pdf', './outdir');
    res.json(movies);
});

// GET /movies/:id
// GET specific movie PDF
router.get('/:id', async (req: Request, res: Response) => {
    const movieId= parseInt(req.params.id, 10);
    const resp = await movie_API.getData(`3/movie/${String(movieId)}`); // async await 
    const movie: Movie = {
        title: resp['title'],
        release_date: resp['release_date'],
        vote_average: resp['vote_average'],
        poster_path: resp['poster_path']
    }; // req spec movie from Movie DB

    console.log(movie)
    const headers = Object.keys([movie][0]);
    const tableArrays = [movie].map(obj => Object.values(obj).map(value => String(value)));
    const completeTable = [headers, ...tableArrays];
    generatePDF(completeTable, `film_${movie.title}.pdf`, './outdir', `https://image.tmdb.org/t/p/w500${resp['poster_path']}`);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Export the router
export default router;