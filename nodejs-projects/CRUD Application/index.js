const express = require("express");
const mysql = require("mysql");
const crudConnection = require("./connections/crudConnection");
const insertRouter = require("./routers/insertRouter");
const updateRouter = require("./routers/updateRouter");
const deleteRouter = require("./routers/deleteRouter");
const { getOneRouter, getAllRouter } = require("./routers/getRouter");

const app = express();

// add parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add router middlewares
app.post("/insert", insertRouter);

app.delete("/delete/:email", deleteRouter);

app.put("/update/:email", updateRouter);

app.get("/get/:email", getOneRouter);

app.get("/all", getAllRouter);

app.listen(3000, () => {
    console.log("Listening to port number 3000...");
});

// learn nested router
