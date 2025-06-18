import dotenv from "dotenv";
dotenv.config();



export const config = {
    PORT: process.env.PORT,
    PORT_MONGODB: process.env.PORT_MONGODB,
    MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    MONGO_URL: process.env.MONGO_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REDIS_PORT: process.env.REDIS_PORT,
}
    