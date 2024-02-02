/**
 * Declare on top
 * Automatically handles async errors and send errors to the global error handler calling next(error)
 * */
import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { postRoutes } from "./src/api/posts/posts.routes";
import { notFoundHandler } from "./src/middlewares/not-found.middleware";
import { globalErrorHandler } from "./src/middlewares/global-error-handler.middleware";

import { config } from "./src/config/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);

app.listen(config.port, () => {
    console.log("Server listening on port 3000...");
});
