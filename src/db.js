import mongoose from 'mongoose';
import { MONGO_DB_URI } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
  }
};
