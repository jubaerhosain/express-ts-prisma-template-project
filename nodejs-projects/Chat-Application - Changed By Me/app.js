// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const { notFoundHandler, defaultErrorHandler } = require("./middlewares/common/errorHandler");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

const app = express();
dotenv.config();

// database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to MongoDB");
});

// request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engin
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/inbox", inboxRouter);
app.use("/users", usersRouter);

// 404 not found middleware
app.use(notFoundHandler);

// default error handling middleware
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});

/**
 * admin
 * abc@123@IIT
 *
 */
