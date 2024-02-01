import express from "express";
import { postRoutes } from "./src/posts/posts.routes";
import { notFoundHandler } from "./src/middlewares/not-found.middleware";
import { defaultErrorHandler } from "./src/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);

app.use(notFoundHandler);
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000...");
});
