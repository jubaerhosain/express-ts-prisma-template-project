import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { Post } from "./sequelize.models";

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.mysql.host,
    port: 3306,
    database: config.mysql.database,
    username: config.mysql.username,
    password: config.mysql.password,
    models: [Post],
});

// Test the connection
export function initializeMySqlConnection() {
    sequelize
        .authenticate()
        .then(() => {
            console.log("MySql connection has been established successfully.");
            sequelize.sync();
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
}

initializeMySqlConnection();