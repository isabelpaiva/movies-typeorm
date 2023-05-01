import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { returnList } from "../schema/movieSchema";

const moviesRepository = AppDataSource.getRepository(Movie);

export const createMovieService = async (payload: any) => {
  const newMovie = await moviesRepository.create(payload);
  return await moviesRepository.save(newMovie);
};

export const getMovieService = async (payload: any) => {
  const { page, perPage, sort, order } = payload;

  let pageResult: number = page && parseInt(page) > 0 ? parseInt(page) : 1;

  let perPageResult: number =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : 5;

  if (perPageResult > 5) {
    perPageResult = 5;
  }

  let sortResult: string =
    sort === "price" || sort === "duration" ? sort : "id";

  let orderResult: string = order === "asc" || order === "desc" ? order : "ASC";

  if (sortResult === "id" || sort === null) {
    orderResult = "ASC";
  }

  const [movies, count] = await moviesRepository.findAndCount({
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
    order: {
      [sortResult]: orderResult,
    },
  });

  const totalPages = Math.ceil(count / perPageResult);

  const result = {
    nextPage:
      pageResult < totalPages
        ? `http://localhost:3000/movies?page=${
            pageResult + 1
          }&perPage=${perPageResult}`
        : null,
    prevPage:
      pageResult > 1
        ? `http://localhost:3000/movies?page=${
            pageResult - 1
          }&perPage=${perPageResult}`
        : null,
    count,
    data: returnList.parse(movies),
  };

  return result;
};

export const deleteMovieService = async (id: number) => {
  await moviesRepository.delete({ id });
};



export const updateMovieService = async (id: number, payload: any) => {
  const update = await moviesRepository.update(id, { ...payload });
  const userUpdated = await moviesRepository.findOneBy({ id });
  return userUpdated;
};
