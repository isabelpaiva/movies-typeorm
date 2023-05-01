import { NextFunction, Request, Response } from "express";
import {
  formatErrors,
  moviesSchema,
  updateMoviesSchema,
} from "../schema/movieSchema";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const moviesRepository = AppDataSource.getRepository(Movie);

export const verifyMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await moviesSchema.parse(req.body);
  } catch (error: any) {
    return res.status(400).json(formatErrors(error.errors));
  }

  return next();
};

export const verifyUpdateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateMoviesSchema.parse(req.body);
  } catch (error: any) {
    return res.status(400).json(formatErrors(error.errors));
  }

  return next();
};

export const verifyMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.name) {
    const movie = await moviesRepository.findOneBy({ name: req.body.name });

    if (movie) {
      return res.status(409).json({ message: "Movie already exists." });
    }
  }
  return next();
};

export const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const movie = await moviesRepository.findOneBy({ id });
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return next();
};
