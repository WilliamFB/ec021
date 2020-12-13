require('dotenv').config();

export const DB_URL = process.env.DB_URL;

export const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    dbName: process.env.DB_NAME
};
