import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { moviesRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(moviesRouter);

export default app;
