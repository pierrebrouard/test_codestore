// src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import env from 'env-var';
import movieRouter  from './routes/movie';

// Load ENV var from .env
dotenv.config();

const app = express();
const port = env.get('PORT').required().asPortNumber();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/movie', movieRouter);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Node.js TypeScript API');
});


// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
