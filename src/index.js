import app from './app.js';
import { connectDB } from './db.js';
import { PORT } from './config.js';

connectDB();

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`);
});