import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

export const TOKEN_SECRET = 'some secret token';
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const PORT = process.env.PORT;
