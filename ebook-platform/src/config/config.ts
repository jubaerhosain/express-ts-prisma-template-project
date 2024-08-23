import * as dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        expiry: process.env.JWT_EXPIRY,
        secret: process.env.JWT_SECRET,
    },
    cookie: {
        secret: process.env.COOKIE_SECRET,
        authCookieName: process.env.AUTH_COOKIE_NAME,
    },
};

// remove default nestjs configuration???
