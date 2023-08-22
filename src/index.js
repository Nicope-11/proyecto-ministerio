import mongoose from 'mongoose';
import app from './app.js';
import { connectDB } from './config/dbConn.js';
import { logEvents } from './middlewares/logger.js';

const PORT = process.env.PORT || 3000;

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
