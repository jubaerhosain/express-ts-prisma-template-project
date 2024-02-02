export const config = {
    port: process.env.PORT,
    mysql: {
        database: process.env.MYSQL_DB_NAME,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
    },
};