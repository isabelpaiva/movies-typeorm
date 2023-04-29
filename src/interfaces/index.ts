import { DeepPartial } from "typeorm/index";
import { z } from "zod";
import {
  moviesSchema,
  returnMovieSchema,
  returnList,
} from "../schema/movieSchema";
type IMovieRequest = z.infer<typeof moviesSchema>;
type IMovieReturn = z.infer<typeof returnMovieSchema>;
type IAllMoviesReturn = z.infer<typeof returnList>;
type IMovieUpdate = DeepPartial<IMovieRequest>;

export { IMovieRequest, IMovieReturn, IAllMoviesReturn, IMovieUpdate };
