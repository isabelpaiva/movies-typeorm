import { Request, Response } from "express";
import {
  createMovieService,
  deleteMovieService,
  getMovieService,
  updateMovieService,
} from "../service/movies.services";

export const createMovie = async (req: Request, res: Response) => {
  const response = await createMovieService(req.body);
  return res.status(201).json(response);
};

export const getMovies = async (req: Request, res: Response) => {
  const response = await getMovieService(req.query);
  return res.status(200).json(response);
};

export const deleteMovies = async (req: Request, res: Response) => {
  const response = await deleteMovieService(Number(req.params.id));
  return res.status(204).json({});
};

export const updateMovies = async (req: Request, res: Response) => {
  const response = await updateMovieService(Number(req.params.id), req.body);
  return res.status(200).json(response);
};
