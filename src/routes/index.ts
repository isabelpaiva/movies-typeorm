import { Router } from "express";
import {
  verifyId,
  verifyMovie,
  verifyMovieExists,
  verifyUpdateMovie,
} from "../middleware";
import {
  createMovie,
  deleteMovies,
  getMovies,
  updateMovies,
} from "../controller";

export const moviesRouter = Router();

moviesRouter.post("/movies", verifyMovie, verifyMovieExists, createMovie);
moviesRouter.get("/movies", getMovies);
moviesRouter.patch(
  "/movies/:id",
  verifyId,
  verifyUpdateMovie,
  verifyMovieExists,
  updateMovies
);
moviesRouter.delete("/movies/:id", verifyId, deleteMovies);
