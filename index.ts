import express from "express";
import "express-async-errors"; // automatically handles async error and send to the global error handler
import { postRoutes } from "./src/posts/posts.routes";
import { notFoundHandler } from "./src/middlewares/not-found.middleware";
import { globalErrorHandler } from "./src/middlewares/global-error-handler.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000...");
});
