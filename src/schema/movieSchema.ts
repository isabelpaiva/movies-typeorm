import * as z from "zod";

export const moviesSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  price: z.number().int(),
  duration: z
    .number()
    .min(1, { message: "Number must be greater than 0" })
    .nullish(),
});

export const updateMoviesSchema = moviesSchema.partial();

interface FieldErrors {
  [key: string]: string[];
}

interface NestedErrors {
  message: FieldErrors;
}

interface ZodError {
  path: string[];
  message: string;
}

export function formatErrors(errors: ZodError[]): NestedErrors {
  const fieldErrors: FieldErrors = {};
  for (const error of errors) {
    const field = error.path[0];
    const message = error.message;
    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push(message);
  }
  return { message: fieldErrors };
}

export const returnMovieSchema = moviesSchema.extend({
  id: z.number(),
});
export const returnList = returnMovieSchema.array();
